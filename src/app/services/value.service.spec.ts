import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';
import { TestBed } from '@angular/core/testing';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    })
    service = TestBed.inject(ValueService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for Get Value', () => {
    it('should return "my value"', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
    });
  });

  describe('Test for Set Value', () => {
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for promise', () => {
    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('should return "promise value" from promise using async/await', async () => {
      const value = await service.getPromiseValue();
      expect(value).toBe('promise value');
    });
  });

  describe('Test for Observable', () => {
    it('should return "observable value" from observable', (doneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        doneFn();
      });
    });

    it('should return "observable value" from observable async', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('observable value');
    });
  });
});
