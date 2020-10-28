import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs packages
import { Observable, timer } from 'rxjs';
import { map, retryWhen, delayWhen } from 'rxjs/operators';

// self-defined objects
import { companySummary } from '../models/companySummary';
import { tickerPrice } from '../models/tickerPrice';
import { autoCompleteEntry } from '../models/autoCompleteEntry';
import { dailyPrice } from '../models/dailyPrice';

@Injectable({
  providedIn: 'root'
})


export class DataServiceService {
  //TODO: implement cache
  private api = "http://localhost:80/api/";

  constructor(private http: HttpClient) { }

  //get summary method
  public getSummary(ticker: string): Observable<companySummary> {
    return this.http.get<companySummary>('http://localhost:80/api/summary/'+ticker).pipe(
      map(res => {
          let result: companySummary;
          result = res;
          return result;
      }),
      retryWhen(errors =>
        errors.pipe(
          // Retry the query again in 1 sec
          delayWhen(val => timer(10000))
        )
      )  
    );
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

  public getDailyChart(ticker: string): Observable<dailyPrice[]> {
    let observable: Observable<dailyPrice[]>;
    observable = this.http.get<dailyPrice[]>('http://localhost:80/api/dailychartsummary/'+ticker);
    return observable;
  }
}
