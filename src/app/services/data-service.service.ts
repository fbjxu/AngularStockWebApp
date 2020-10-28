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

const retryTimer = 5000;

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
          delayWhen(val => timer(retryTimer))
        )
      )  
    );
  }

  public getPrice(ticker: string): Observable<tickerPrice> {
    
    return this.http.get<tickerPrice>('http://localhost:80/api/pricesummary/'+ticker).pipe(
      map(res => {
        let result: tickerPrice;
        result =res;
        return result;
      }),
      retryWhen(errors =>
        errors.pipe(
          // Retry the query again in 0.5 sec
          delayWhen(val => timer(retryTimer))
        )
      )
    );
  }

  public getAutoComplete(input: string): Observable<autoCompleteEntry[]> {

    return this.http.get<autoCompleteEntry[]>('http://localhost:80/api/autocomplete/'+input).pipe(
      map(res => {
        let result: autoCompleteEntry[];
        result =res;
        return result;
      })
    );
  }

  public getDailyChart(ticker: string): Observable<dailyPrice[]> {
    let observable: Observable<dailyPrice[]>;
    return this.http.get<dailyPrice[]>('http://localhost:80/api/dailychartsummary/'+ticker).pipe(
      map(res => {
        let result: dailyPrice[];
        result =res;
        return result;
      }),
      retryWhen(errors =>
        errors.pipe(
          // Retry the query again in 0.5 sec
          delayWhen(val => timer(retryTimer))
        )
      )
    );
  }
}
