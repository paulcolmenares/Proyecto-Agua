import { TestBed } from '@angular/core/testing';
import { LecturasService } from './lecturas.service';


describe('ConsumoService', () => {
  let service: LecturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
