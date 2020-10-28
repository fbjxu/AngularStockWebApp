import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { watchListStock } from '../models/watchListStock';
import { DataServiceService } from '../services/data-service.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistmanagerService {
  // private watchlist:watchListStock[];
  // public watchListChange: Subject<string[]> = new Subject<string[]>();//init to empty

  constructor(private dataService: DataServiceService) { 
    let watchlist = this.getWatchList();
  }

  public getWatchList(): watchListStock[] {
    let localStorageItem = JSON.parse(localStorage.getItem('watchlist')); //get current json from local storage
    var stockList:string[]=[];
    if (localStorageItem == null) {
      return [];
    }

    for (let stock of localStorageItem.watchlist) {//fill up stock list
      stockList.push(stock.ticker);
    }
    var stocklistquery = stockList.join(",");

    return localStorageItem.watchlist;
  }
  
  public addTicker(ticker_input:string, name_input:string) {
    let newWatchListItem = new watchListStock(ticker_input, name_input);
    let watchlist = this.getWatchList();
    watchlist.push(newWatchListItem);
    this.setLocalStorageWatchList(watchlist);
    console.log(watchlist);
  }

  public deleteTicker(ticker_input:string) {
    let watchlist = this.getWatchList();
    watchlist = watchlist.filter(item => item.ticker != ticker_input);
    this.setLocalStorageWatchList(watchlist);
    console.log(watchlist);
  }

  private setLocalStorageWatchList(watchlist: watchListStock[]) {
    localStorage.setItem('watchlist', JSON.stringify({watchlist : watchlist}))
  }
}
