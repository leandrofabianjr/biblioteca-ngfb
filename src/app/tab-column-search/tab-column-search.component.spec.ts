import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabColumnSearchComponent } from './tab-column-search.component';

describe('TabColumnSearchComponent', () => {
  let component: TabColumnSearchComponent;
  let fixture: ComponentFixture<TabColumnSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabColumnSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabColumnSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
