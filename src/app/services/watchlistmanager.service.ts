import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WatchlistmanagerService {

  watchlistSubject: Subject<string[]> = new Subject<string[]>();//init to empty
  _watchlist:string[] = [];
  constructor() { }
  
  public addTicker(ticker:string) {
    console.log("added"+ticker);
    this._watchlist.push(ticker);
    this.watchlistSubject.next(this._watchlist);
  }

  public deleteTicker(ticker:string) {
    console.log("deleted"+ticker);
    this._watchlist = this._watchlist.filter(item => item != ticker);
    this.watchlistSubject.next(this._watchlist);
  }

  getWatchList(): Observable<string[]> {
    return this.watchlistSubject.asObservable();
  }
}
