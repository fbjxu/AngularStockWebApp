import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  ticker:string; //corresponding stock ticker for the detailed page 

  constructor(private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService) { }

  ngOnInit(): void {
  }

  makeSearchInvisible() {
    this.componentLayoutService.makeInvisible();
  }

}
