import { TestBed } from '@angular/core/testing';

import { MytanslateService } from './mytanslate.service';

describe('MytanslateService', () => {
  let service: MytanslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MytanslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
