import { TestBed, inject } from '@angular/core/testing';

import { ComponentConnectorService } from './component-connector.service';

describe('ComponentConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentConnectorService]
    });
  });

  it('should be created', inject([ComponentConnectorService], (service: ComponentConnectorService) => {
    expect(service).toBeTruthy();
  }));
});
