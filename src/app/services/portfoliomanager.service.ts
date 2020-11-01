import { Injectable } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { tickerPrice } from '../models/tickerPrice';
import { map, retryWhen, delayWhen} from 'rxjs/operators';
import { watchListStock } from '../models/watchListStock';
import { DataServiceService } from '../services/data-service.service';
import { portfolioEntry } from '../models/portfolioEntry';

@Injectable({
  providedIn: 'root'
})
export class PortfoliomanagerService {
  public portfolioChange$:Subject<string> = new Subject<string>();

  constructor(private dataService:DataServiceService) { }

  public getPortfolioList(): portfolioEntry[] {//list of buy details
    console.log("inside getPortfolioList");
    let localStorageItem = JSON.parse(localStorage.getItem('portfolio')); //get current json from local storage
    if (localStorageItem == null) {
      
      return [];
    }
    console.log(localStorageItem.portfolio);
    return localStorageItem.portfolio;
  }

  public getPortfolioTickerList():string[] {//list of tickers
    let localStorageItem = JSON.parse(localStorage.getItem('portfolioTickers')); //get current json from local storage
    if (localStorageItem == null) {
      return [];
    }
    return localStorageItem.portfolioTickers;
  }

  public buyStock(ticker_input:string, name: string, cost:number, numShares:number, avgPrice:number) {
    
    let portfolioList = this.getPortfolioList();
    let portfolioTickers = this.getPortfolioTickerList();
    for (let stock of portfolioList) {
      if(stock.ticker.toLowerCase() == ticker_input.toLowerCase()) {//existing stock in portfolio
        stock.cost += cost;
        stock.numShares += numShares;
        stock.avgPrice = stock.cost / stock.numShares;
        this.setLocalStoragePortfolioList(portfolioList);//update local storage's portfolio number
        this.portfolioChange$.next(ticker_input.toLowerCase());
        console.log("inside buystock: added existed stock now the portfolio is: ", portfolioList);
        return;
      }
    }
    //new stock
    let newPortfolioEntry = new portfolioEntry(ticker_input, name, cost, numShares, avgPrice);
    portfolioList.push(newPortfolioEntry);
    portfolioTickers.push(ticker_input.toLowerCase());
    this.setLocalStoragePortfolioList(portfolioList);
    this.setLocalStoragePortfolioTickers(portfolioTickers);
    this.portfolioChange$.next(ticker_input.toLowerCase());
    console.log("inside buystock: added new stock: now the portfolio is", portfolioTickers);
    return;
  }

  public sellStock(ticker_input:string, numShares:number) {
    let portfolioList = this.getPortfolioList();
    let portfolioTickers = this.getPortfolioTickerList();
    for (let stock of portfolioList) {
      if(stock.ticker.toLowerCase() == ticker_input.toLowerCase()) {//existing stock in portfolio
        stock.cost -= stock.avgPrice * numShares;
        stock.numShares -= numShares;
        //filter out empty positions
        if(stock.numShares == 0) {
          portfolioList = portfolioList.filter(item => item.numShares > 0);
          portfolioTickers = portfolioTickers.filter(item => item.toLowerCase() != ticker_input.toLowerCase());
        }
        this.setLocalStoragePortfolioList(portfolioList);//update local storage's portfolio number
        this.setLocalStoragePortfolioTickers(portfolioTickers);
        this.portfolioChange$.next(ticker_input.toLowerCase());
        console.log("inside sellstock: sold existed stock now the portfolio is: ", portfolioList);
        return;
      }
    }
  }

  private setLocalStoragePortfolioList(portfolioList: portfolioEntry[]) {
    localStorage.setItem('portfolio', JSON.stringify({portfolio : portfolioList}));
  }

  private setLocalStoragePortfolioTickers(portfolioTickers: string[]) {
    localStorage.setItem('portfolioTickers', JSON.stringify({portfolioTickers : portfolioTickers}));
  }
     

}
