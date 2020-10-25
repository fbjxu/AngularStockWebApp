import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  ticker:string; //corresponding stock ticker for the detailed page 

  constructor(private route: ActivatedRoute ) { }

  ngOnInit(): void {
  }

}
