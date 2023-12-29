import { TestBed } from '@angular/core/testing';

import { CommentEventServiceService } from './comment-event-service.service';

describe('CommentEventServiceService', () => {
  let service: CommentEventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentEventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
