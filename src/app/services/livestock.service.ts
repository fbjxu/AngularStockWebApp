import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { retryWhen } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { dailyPrice } from '../models/dailyPrice';
import { tickerPrice } from '../models/tickerPrice';
import { companySummary } from '../models/companySummary';
import { liveStockInfo } from '../models/liveStockInfo';

import { DataServiceService } from './data-service.service';


@Injectable({
  providedIn: 'root'
})
export class LivestockService {
  subscription: Subscription;
  dailyChartRawData: dailyPrice[];
  liveStockData:liveStockInfo = new liveStockInfo();

  constructor(private dataService: DataServiceService) { 
  }
  
  public lookUpSummary(ticker:string) { //used to grab company summary
    var summaryObserve:Observable<companySummary>;
    var priceSummaryObserve: Observable<tickerPrice>;
    var dailyPriceObserve: Observable<dailyPrice[]>;

    summaryObserve = this.dataService.getSummary(ticker);
    summaryObserve.subscribe(summaryData => 
      {//get summary
        this.liveStockData.ticker = summaryData.ticker;
        this.liveStockData.name = summaryData.name;
        this.liveStockData.exchangeCode = summaryData.exchangeCode;
        this.liveStockData.description = summaryData.description;
        this.liveStockData.startDate = summaryData.startDate;
      });

    priceSummaryObserve = this.dataService.getPrice(ticker);
    priceSummaryObserve.subscribe(priceData=>{
      //get openPrice
      var price = priceData[0];//the response is an array of length 1
      this.liveStockData.high = price.high;
      this.liveStockData.mid = price.mid;
      this.liveStockData.low = price.low;
      this.liveStockData.askPrice = price.askPrice;
      this.liveStockData.open = price.open
      this.liveStockData.askSize = price.askSize;
      this.liveStockData.prevClose = price.prevClose;
      this.liveStockData.bidPrice = price.bidPrice;
      this.liveStockData.volume = price.volume;
      this.liveStockData.bidSize = price.bidSize;
      this.liveStockData.openPrice= price.open
    });

    dailyPriceObserve = this.dataService.getDailyChart(ticker);
    dailyPriceObserve.subscribe(dailyChartData=>{
        this.dailyChartRawData = dailyChartData;
        var livePrice = this.dailyChartRawData[dailyChartData.length-1].close;
        var liveDiff = livePrice - this.liveStockData.openPrice;
        var liveDiffPercent = liveDiff / this.liveStockData.openPrice;
        this.liveStockData.livePrice = livePrice.toFixed(2);
        this.liveStockData.liveDiff = liveDiff.toFixed(2);
        this.liveStockData.liveDiffPercent = "%"+(liveDiffPercent*100).toFixed(2);
        //time
        var liveTime = this.dailyChartRawData[dailyChartData.length-1].date;
        this.liveStockData.liveTime = liveTime;
        if(liveDiff>=0) {
          this.liveStockData.livePriceUp=true;
        } else {
          this.liveStockData.livePriceUp=false;
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
          var liveDiff = livePrice - this.liveStockData.openPrice;
          var liveDiffPercent = liveDiff / this.liveStockData.openPrice;
          this.liveStockData.livePrice = livePrice.toFixed(2);
          this.liveStockData.liveDiff = liveDiff.toFixed(2);
          this.liveStockData.liveDiffPercent = "%"+(liveDiffPercent*100).toFixed(2);
          //time
          var liveTime = this.dailyChartRawData[dailyChartData.length-1].date;
          this.liveStockData.liveTime = liveTime;
          console.log(dailyChartData[dailyChartData.length-1]);
        }
      )
    })
  }
}
