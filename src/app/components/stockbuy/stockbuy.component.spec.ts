import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockbuyComponent } from './stockbuy.component';

describe('StockbuyComponent', () => {
  let component: StockbuyComponent;
  let fixture: ComponentFixture<StockbuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockbuyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockbuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
