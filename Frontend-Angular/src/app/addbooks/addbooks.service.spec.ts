import { TestBed } from '@angular/core/testing';

import { AddbooksService } from './addbooks.service';

describe('AddbooksService', () => {
  let service: AddbooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddbooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
