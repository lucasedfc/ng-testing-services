import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError, zip } from 'rxjs';

import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from './../models/product.model';


@Injectable({
  providedIn: 'root',
})


export class ProductsService {
  private apiUrl: string = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {

    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: item.price > 0 ? .19 * item.price : 0
        }
      }))
    );
  }

  getByCategory(id: string, limit?: number, offset?: number) {

    let params = new HttpParams();
    if (limit && offset) {

      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${id}/products`, {params})

  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError('Error en Server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError('No estas autorizado');
        }

        return throwError('Algo salio mal');
      })
    );
  }

  getProductByPage(limit: number, offset: number) {
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params: {
          limit,
          offset,
        }
      })
      .pipe(retry(3));
  }

  getAllSimple() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDto) {
    return zip(
      this.getProductById(id),
      this.update(id, dto)
    );
  }

  create(data: CreateProductDto) {
    return this.http.post<Product>(`${this.apiUrl}/products`, data);
  }

  update(id: string, data: UpdateProductDto) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
