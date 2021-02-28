import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoListaComponent } from './evento-lista.component';

describe('EventoListaComponent', () => {
  let component: EventoListaComponent;
  let fixture: ComponentFixture<EventoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
