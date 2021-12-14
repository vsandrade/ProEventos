/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RedeSocialService } from './redeSocial.service';

describe('Service: RedeSocial', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedeSocialService]
    });
  });

  it('should ...', inject([RedeSocialService], (service: RedeSocialService) => {
    expect(service).toBeTruthy();
  }));
});
