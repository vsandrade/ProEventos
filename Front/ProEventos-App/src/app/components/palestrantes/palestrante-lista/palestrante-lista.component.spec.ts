/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PalestranteListaComponent } from './palestrante-lista.component';

describe('PalestranteListaComponent', () => {
  let component: PalestranteListaComponent;
  let fixture: ComponentFixture<PalestranteListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalestranteListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalestranteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
