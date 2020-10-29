import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { dailyPrice } from '../models/dailyPrice';
import { tickerPrice } from '../models/tickerPrice';
import { companySummary } from '../models/companySummary';
import { liveStockInfo } from '../models/liveStockInfo';

import { DataServiceService } from './data-service.service';

const refreshInterval = 15000;//remember to change to 15s

@Injectable({
  providedIn: 'root'
})
export class LivestockService {
  subscription: Subscription;
  dailyChartRawData: dailyPrice[];
  liveStockData: liveStockInfo = new liveStockInfo();

  constructor(private dataService: DataServiceService) {
  }

  public liveStockServiceInit(ticker: string) {
    this.beginningLook(ticker);
    this.reFreshPrice(ticker);
  }

  public beginningLook(ticker: string) { //used to grab company summary
    console.log("inside beginning look");
    var summaryObserve: Observable<companySummary>;
    summaryObserve = this.dataService.getSummary(ticker);
    summaryObserve.subscribe((summaryData: companySummary) => {//get summary
      this.liveStockData.ticker = summaryData.ticker;
      this.liveStockData.name = summaryData.name;
      this.liveStockData.exchangeCode = summaryData.exchangeCode;
      this.liveStockData.description = summaryData.description;
      this.liveStockData.startDate = summaryData.startDate;
    });
  }

  public reFreshPrice(ticker: string) {//repeatly request live stock info
    console.log("inside reFreshPrice");
    var priceSummaryObserve: Observable<tickerPrice[]>;
    var dailyPriceObserve: Observable<dailyPrice[]>;

    const source = interval(refreshInterval); //set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val => {
      priceSummaryObserve = this.dataService.getPrice(ticker);
      priceSummaryObserve.subscribe((priceData: tickerPrice[]) => {
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
        this.liveStockData.openPrice = price.open;
        this.liveStockData.last = price.last;
        var liveDiff = this.liveStockData.last - this.liveStockData.prevClose; //change = last - prevClose
        var liveDiffPercent = liveDiff / this.liveStockData.prevClose;
        //calculate the displayed stock price numbers
        this.liveStockData.livePrice = this.liveStockData.last.toFixed(2); //livePrice is last
        this.liveStockData.liveDiff = liveDiff.toFixed(2);
        this.liveStockData.liveDiffPercent = "%" + (liveDiffPercent * 100).toFixed(2);
        //timestamp
        var liveTime = new Date(Date.parse(price.timestamp));
        var requestTime = new Date();
        this.liveStockData.liveTime = this.getTime(liveTime);
        this.liveStockData.requestTime = this.getTime(requestTime);
        if (liveDiff >= 0) {
          this.liveStockData.livePriceUp = true;
        } else {
          this.liveStockData.livePriceUp = false;
        }
        console.log("refreshed price: " + JSON.stringify(price));
      });
    })
  }

  public getTime(date_input: Date):string {
    let date = ("0" + date_input.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_input.getMonth() + 1)).slice(-2);
    // current year
    let year = date_input.getFullYear();
    // current hours
    let hours = date_input.getHours();
    // current minutes
    let minutes = date_input.getMinutes();
    // current seconds
    let seconds = date_input.getSeconds();
    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  }


}
