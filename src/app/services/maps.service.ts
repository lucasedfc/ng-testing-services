import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  center = { lat: 0, lon: 0 };
  constructor() {}

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((response) => {
      const { latitude, longitude } = response.coords;
      this.center = { lat: latitude, lon: longitude };
    });
  }
}
