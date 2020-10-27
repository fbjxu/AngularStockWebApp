import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { dailyPrice } from '../models/dailyPrice';
import { tickerPrice } from '../models/tickerPrice';
import { companySummary } from '../models/companySummary';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class LivestockService {


  summary: companySummary;
  price: tickerPrice;
  openPrice: number; //open price for the ticker
  lastPrice: number;
  subscription: Subscription;
  dailyChartRawData: dailyPrice[];
  //live stock price
  livePrice: string;
  liveDiff: string;
  liveDiffPercent: string;
  livePriceUp:boolean = true;
  liveTime: string;

  constructor(private dataService: DataServiceService) { 
  }
  
  public lookUpSummary(ticker:string) { //used to grab company summary
    var summaryObserve:Observable<companySummary>;
    var priceSummaryObserve: Observable<tickerPrice>;
    var dailyPriceObserve: Observable<dailyPrice[]>;

    summaryObserve = this.dataService.getSummary(ticker);
    summaryObserve.subscribe(summaryData => this.summary = summaryData);

    priceSummaryObserve = this.dataService.getPrice(ticker);
    priceSummaryObserve.subscribe(priceData=>{
      this.price = priceData[0];//the response is an array
      this.openPrice=this.price.open;
    });

    dailyPriceObserve = this.dataService.getDailyChart(ticker);
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

  public reFreshPrice(ticker:string) {//repeatly request live stock info
    const source = interval(15000); //set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val=> {
      this.dataService.getDailyChart(ticker).subscribe(
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
}
