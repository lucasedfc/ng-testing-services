import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

fdescribe('MapsService', () => {
  let mapService: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    mapService = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('test for getCurrentPosition', () => {
    it('should save center', () => {
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((successFn) => {
        const mockGeolocation = {
          coords: {
            accuracy : 0,
            altitude : 0,
            altitudeAccuracy : 0,
            heading : 0,
            latitude : 1000,
            longitude : 2000,
            speed : 0,
          },
          timestamp: 0
        };
        successFn(mockGeolocation);
      });

      mapService.getCurrentPosition();
      expect(mapService.center.lat).toEqual(1000)
      expect(mapService.center.lon).toEqual(2000)
    })
  });
});
