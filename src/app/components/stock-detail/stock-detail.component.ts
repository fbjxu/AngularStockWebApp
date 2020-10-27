import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable, interval, Subscription } from 'rxjs';
import { companySummary } from 'src/app/models/companySummary';
import { tickerPrice } from 'src/app/models/tickerPrice';
import { dailyPrice } from 'src/app/models/dailyPrice';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements AfterViewInit, OnInit {

  ticker: string;
  summary: companySummary;
  price: tickerPrice;
  openPrice: number; //open price for the ticker
  lastPrice: number;
  showSummary: boolean = false;
  subscription: Subscription;
  dailyChartRawData: dailyPrice[];
  //live stock price
  livePrice: string;
  liveDiff: string;
  liveDiffPercent: string;
  livePriceUp:boolean = true;
  liveTime: string;

  refreshRate:number = 15000; //divide 1000 to

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
    var dailyPriceObserve: Observable<dailyPrice[]>;

    summaryObserve = this.dataService.getSummary(this.ticker);
    summaryObserve.subscribe(summaryData => this.summary = summaryData);

    priceSummaryObserve = this.dataService.getPrice(this.ticker);
    priceSummaryObserve.subscribe(priceData=>{
      this.price = priceData[0];//the response is an array
      this.openPrice=this.price.open;
    });

    dailyPriceObserve = this.dataService.getDailyChart(this.ticker);
    dailyPriceObserve.subscribe(dailyChartData=>{
        this.dailyChartRawData = dailyChartData;
        var livePrice = this.dailyChartRawData[dailyChartData.length-1].close;
        var liveDiff = livePrice - this.openPrice;
        var liveDiffPercent = liveDiff / this.openPrice;
        this.livePrice = livePrice.toFixed(2);
        this.liveDiff = liveDiff.toFixed(2);
        this.liveDiffPercent = "%"+(liveDiffPercent*100).toFixed(2);
        //time
        var liveTime = this.dailyChartRawData[dailyChartData.length-1].date;
        this.liveTime = liveTime;
        if(liveDiff>=0) {
          this.livePriceUp=true;
        } else {
          this.livePriceUp=false;
        }
        console.log(dailyChartData[dailyChartData.length-1]);
      }
    )
  }

  public reFreshPrice() {//repeatly request live stock info
    const source = interval(15000); //set interval to 15s
    this.subscription = source.subscribe(val=> {
      this.dataService.getDailyChart(this.ticker).subscribe(
        dailyChartData=>{
          this.dailyChartRawData = dailyChartData;
          var livePrice = this.dailyChartRawData[dailyChartData.length-1].close;
          var liveDiff = livePrice - this.openPrice;
          var liveDiffPercent = liveDiff / this.openPrice;
          this.livePrice = livePrice.toFixed(2);
          this.liveDiff = liveDiff.toFixed(2);
          this.liveDiffPercent = "%"+(liveDiffPercent*100).toFixed(2);
          //time
          var liveTime = this.dailyChartRawData[dailyChartData.length-1].date;
          this.liveTime = liveTime;
          console.log(dailyChartData[dailyChartData.length-1]);
        }
      )
    })
  }


  ngOnInit() {
    this.reFreshPrice();
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showSummary = true;
  }
}
