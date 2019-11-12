import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoErroCampoComponent } from './info-erro-campo.component';

describe('InfoErroCampoComponent', () => {
  let component: InfoErroCampoComponent;
  let fixture: ComponentFixture<InfoErroCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoErroCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoErroCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
