import { TestBed } from '@angular/core/testing';

import { CodeviewerService } from './codeviewer.service';

describe('CodeviewerService', () => {
  let service: CodeviewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeviewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
