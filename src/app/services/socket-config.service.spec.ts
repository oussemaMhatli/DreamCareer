import { TestBed } from '@angular/core/testing';

import { SocketConfigService } from './messages/socket-config.service';

describe('SocketConfigService', () => {
  let service: SocketConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
