import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';
import { Auth } from '../models/auth.model';
import { environment } from '../../environments/environment';

fdescribe('Auth Service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('test for login', () => {
    it('should return a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '1234',
      };

      const email = 'michaelscott@dundermifflin.com';
      const password = 'pleasegodno';

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should save a token', (doneFn) => {
      const mockData: Auth = {
        access_token: '1234',
      };


      const email = 'michaelscott@dundermifflin.com';
      const password = 'pleasegodno';
      spyOn(tokenService, 'saveToken').and.callThrough();

      authService.login(email, password).subscribe((data) => {
        expect(data).toEqual(mockData);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith('1234');
        doneFn();
      });

      // http config
      const url = `${environment.API_URL}/api/v1/auth/login`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });
  });
});
