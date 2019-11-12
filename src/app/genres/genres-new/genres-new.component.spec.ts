import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresNewComponent } from './genres-new.component';

describe('GenresNewComponent', () => {
  let component: GenresNewComponent;
  let fixture: ComponentFixture<GenresNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenresNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenresNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
