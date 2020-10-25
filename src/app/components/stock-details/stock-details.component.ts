import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() ticker: string;

  constructor() { }

  ngOnInit(): void {
  }

}
