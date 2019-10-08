import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('increase size of messages when a message is added', () => {
    var len = service.messages.length;
    service.add("test");
    expect(len).toBe(service.messages.length - 1);
  });

  it('set size of messages to zero when cleared', () => {
    service.add("test2");
    service.add("test3");
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
