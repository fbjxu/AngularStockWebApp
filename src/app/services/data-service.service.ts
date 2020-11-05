import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs packages
import { Observable, timer } from 'rxjs';
import { map, retryWhen, delayWhen, catchError } from 'rxjs/operators';

// self-defined objects
import { companySummary } from '../models/companySummary';
import { tickerPrice } from '../models/tickerPrice';
import { autoCompleteEntry } from '../models/autoCompleteEntry';
import { dailyPrice } from '../models/dailyPrice';
import { historyPrice } from '../models/historyPrice';

const retryTimer = 5000;

@Injectable({
  providedIn: 'root'
})


export class DataServiceService {
  //TODO: implement cache
  private api = "/api/";
  localTesting:string = "" 
  constructor(private http: HttpClient) { }

  //get summary method
  public getSummary(ticker: string): Observable<companySummary> {
    return this.http.get<companySummary>(this.localTesting+'/api/summary/'+ticker).pipe(
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

  public getPrice(ticker: string): Observable<tickerPrice[]> {
    return this.http.get<tickerPrice[]>(this.localTesting+'/api/pricesummary/'+ticker).pipe(
      map(res => {
        let result: tickerPrice[];
        result =res;
        return result;
      })
      // ,
      // retryWhen(errors =>
      //   errors.pipe(
      //     // Retry the query again in 0.5 sec
      //     delayWhen(val => timer(retryTimer)),

      //   )
      // )
    );
  }

  public getAutoComplete(input: string): Observable<autoCompleteEntry[]> {

    return this.http.get<autoCompleteEntry[]>(this.localTesting+'/api/autocomplete/'+input).pipe(
      map(res => {
        let result: autoCompleteEntry[];
        result =res;
        return result;
      })
    );
  }

  public getDailyChart(ticker: string): Observable<dailyPrice[]> {
    let observable: Observable<dailyPrice[]>;
    return this.http.get<dailyPrice[]>(this.localTesting+'/api/dailychartsummary/'+ticker).pipe(
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

  public getHistoryChart(ticker: string): Observable<historyPrice[]> {
    let observable: Observable<historyPrice[]>;
    return this.http.get<historyPrice[]>(this.localTesting+'/api/historychartsummary/'+ticker).pipe(
      map(res => {
        let result: historyPrice[];
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

  public oneTimeLivePrices(tickers:string[]):Observable<tickerPrice[]>{
    var ticker_query = tickers.join(",");
    return  this.getPrice(ticker_query).pipe(
      map(res => {
        let result: tickerPrice[];
        result = res;
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
