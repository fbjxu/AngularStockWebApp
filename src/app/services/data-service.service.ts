import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs packages
import { Observable, timer } from 'rxjs';
import { map, retryWhen, delayWhen } from 'rxjs/operators';

// self-defined objects
import { companySummary } from '../models/companySummary';
import { tickerPrice } from '../models/tickerPrice';
import { autoCompleteEntry } from '../models/autoCompleteEntry';

@Injectable({
  providedIn: 'root'
})


export class DataServiceService {
  //TODO: implement cache
  private api = "http://localhost:80/api/";

  constructor(private http: HttpClient) { }

  //get summary method
  public getSummary(ticker: string): Observable<companySummary> {
    let observable: Observable<companySummary>;
    observable = this.http.get<companySummary>('http://localhost:80/api/summary/'+ticker);
    return observable;
  }

  public getPrice(ticker: string): Observable<tickerPrice> {
    let observable: Observable<tickerPrice>;
    observable = this.http.get<tickerPrice>('http://localhost:80/api/pricesummary/'+ticker);
    return observable;
  }

  public getAutoComplete(input: string): Observable<autoCompleteEntry[]> {
    let observable: Observable<autoCompleteEntry[]>;
    observable = this.http.get<autoCompleteEntry[]>('http://localhost:80/api/autocomplete/'+input);
    return observable;
  }
}
