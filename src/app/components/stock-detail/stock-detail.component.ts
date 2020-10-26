import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable } from 'rxjs';
import { companySummary } from 'src/app/models/companySummary';
import { tickerPrice } from 'src/app/models/tickerPrice';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements AfterViewInit {

  ticker: string;
  summary: companySummary;
  price: tickerPrice;
  showSummary: boolean = false;

  //stock info
  constructor(private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService, 
    private dataService: DataServiceService, private spinnerService:SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear
    this.ticker = this.route.snapshot.params['ticker']; //set ticker
    this.lookUpSummary();
  }

  private lookUpSummary() { //used to grab company summary
    var summaryObserve:Observable<companySummary>;
    var priceSummaryObserve: Observable<tickerPrice>;

    summaryObserve = this.dataService.getSummary(this.ticker);
    summaryObserve.subscribe(summaryData => this.summary = summaryData);

    priceSummaryObserve = this.dataService.getPrice(this.ticker);
    priceSummaryObserve.subscribe(priceData=>{
      this.price = priceData[0];//the response is an array
    });
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showSummary = true;
  }
}
