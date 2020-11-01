import { Injectable } from '@angular/core';
import { Observable, timer, Subject } from 'rxjs';
import { tickerPrice } from '../models/tickerPrice';
import { map, retryWhen, delayWhen} from 'rxjs/operators';
import { watchListStock } from '../models/watchListStock';
import { DataServiceService } from '../services/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistmanagerService {
  // private watchlist:watchListStock[];
  // public watchListChange: Subject<string[]> = new Subject<string[]>();//init to empty
  public myStockList:tickerPrice[];
  public isYellowStar$:Subject<boolean> = new Subject<boolean>();
  public watchlistChange$:Subject<watchListStock[]> = new Subject<watchListStock[]>();

  constructor(private dataService:DataServiceService) { 
    // let watchlist = this.getWatchList();
  }

  public yellowStar(ticker:string):boolean {
    var watchlistItems = this.getWatchList();
    for(let stock of watchlistItems) {
      if (stock.ticker.toLowerCase() == ticker.toLowerCase()) {
        return true
      }
    }
    return false;
  }

  public getYellowStar():Observable<boolean> {
    return this.isYellowStar$;
  }


  public getWatchList(): watchListStock[] {
    console.log("inside getWatchLIst");
    let localStorageItem = JSON.parse(localStorage.getItem('watchlist')); //get current json from local storage
    if (localStorageItem == null) {
      return [];
    }
    return localStorageItem.watchlist;
  }
  
  public addTicker(ticker_input:string, name_input:string) {
    let newWatchListItem = new watchListStock(ticker_input, name_input);
    let watchlist = this.getWatchList();
    watchlist.push(newWatchListItem);
    this.setLocalStorageWatchList(watchlist);
    this.isYellowStar$.next(true);
    this.watchlistChange$.next(watchlist);
    console.log(watchlist);
  }

  public deleteTicker(ticker_input:string) {
    let watchlist = this.getWatchList();
    watchlist = watchlist.filter(item => item.ticker.toLowerCase() != ticker_input.toLowerCase());
    this.setLocalStorageWatchList(watchlist);
    this.isYellowStar$.next(false);
    this.watchlistChange$.next(watchlist);
    console.log(watchlist);
  }

  private setLocalStorageWatchList(watchlist: watchListStock[]) {
    localStorage.setItem('watchlist', JSON.stringify({watchlist : watchlist}))
  }

  public createMyStocklist(): Observable<tickerPrice[]> {
    console.log("inside createMyStocklist");
    var stockList: string[] = []
    var watchListItems = this.getWatchList();
    for (let watchStock of watchListItems) {
      stockList.push(watchStock.ticker);
    }
    
    var ticker_query = stockList.join(",");
    
    // console.log("ticker query"+ticker_query);
    return this.dataService.getPrice(ticker_query);
  }

}
