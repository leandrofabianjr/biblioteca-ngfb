import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersNewComponent } from './publishers-new.component';

describe('PublishersNewComponent', () => {
  let component: PublishersNewComponent;
  let fixture: ComponentFixture<PublishersNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishersNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
