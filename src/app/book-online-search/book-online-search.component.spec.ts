import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOnlineSearchComponent } from './book-online-search.component';

describe('BookOnlineSearchComponent', () => {
  let component: BookOnlineSearchComponent;
  let fixture: ComponentFixture<BookOnlineSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOnlineSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOnlineSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
