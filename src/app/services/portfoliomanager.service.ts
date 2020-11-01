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

  constructor(private dataService:DataServiceService) { }

  public getPortfolioList(): portfolioEntry[] {
    console.log("inside getPortfolioList");
    let localStorageItem = JSON.parse(localStorage.getItem('portfolio')); //get current json from local storage
    if (localStorageItem == null) {
      return [];
    }
    return localStorageItem.portfolio;
  }

  public buyStock(ticker_input:string, name: string, cost:number, numShares:number, avgPrice:number) {
    
    let portfolioList = this.getPortfolioList();
    for (let stock of portfolioList) {
      if(stock.ticker.toLowerCase() == ticker_input.toLowerCase()) {//existing stock in portfolio
        stock.cost += cost;
        stock.numShares += numShares;
        stock.avgPrice = stock.cost / stock.numShares;
        this.setLocalStoragePortfolioList(portfolioList);//update local storage's portfolio number
        console.log("inside buystock: added existed stock now the portfolio is: ", portfolioList);
        return;
      }
    }
    //new stock
    let newPortfolioEntry = new portfolioEntry(ticker_input, name, cost, numShares, avgPrice);
    portfolioList.push(newPortfolioEntry);
    this.setLocalStoragePortfolioList(portfolioList);
    console.log("inside buystock: added new stock: now the portfolio is", portfolioList);
    return;
  }

  public sellStock(ticker_input:string, name: string, marketVal:number, numShares:number, avgPrice:number) {
    let portfolioList = this.getPortfolioList();
    for (let stock of portfolioList) {
      if(stock.ticker.toLowerCase() == ticker_input.toLowerCase()) {//existing stock in portfolio
        stock.cost -= stock.avgPrice * numShares;
        stock.numShares -= numShares;
        this.setLocalStoragePortfolioList(portfolioList);//update local storage's portfolio number
        console.log("inside sellstock: sold existed stock now the portfolio is: ", portfolioList);
        return;
      }
    }
  }

  private setLocalStoragePortfolioList(portfolioList: portfolioEntry[]) {
    localStorage.setItem('portfolio', JSON.stringify({portfolio : portfolioList}));
  }

}
