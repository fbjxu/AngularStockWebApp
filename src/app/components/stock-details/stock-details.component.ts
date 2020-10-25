import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';

import { Observable, Subscription, timer } from 'rxjs';
import { companySummary } from 'src/app/models/companySummary';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  summary: companySummary;
  // stockDescription: string;
  // endDate: string;
  // exchangeCode: string;
  // startDate: string;
  // name: string;
  ticker: string;

  //stock info
  constructor(private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService, private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.componentLayoutService.makeInvisible(); //make search section disappear
    this.ticker = this.route.snapshot.params['ticker']; //set ticker
    this.lookUpSummary();
  }

  private lookUpSummary() {
    var summaryObserve:Observable<companySummary>;
    summaryObserve = this.dataService.getSummary(this.ticker);
    summaryObserve.subscribe(data => this.summary = data);
  }

}
