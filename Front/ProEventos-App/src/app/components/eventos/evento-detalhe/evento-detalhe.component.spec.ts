import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoDetalheComponent } from './evento-detalhe.component';

describe('EventoDetalheComponent', () => {
  let component: EventoDetalheComponent;
  let fixture: ComponentFixture<EventoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
