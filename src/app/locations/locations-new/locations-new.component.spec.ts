import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsNewComponent } from './locations-new.component';

describe('LocationsNewComponent', () => {
  let component: LocationsNewComponent;
  let fixture: ComponentFixture<LocationsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
