import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsWindowComponent } from './news-window.component';

describe('NewsWindowComponent', () => {
  let component: NewsWindowComponent;
  let fixture: ComponentFixture<NewsWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
