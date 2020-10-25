import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs packages
import { Observable, timer } from 'rxjs';
import { map, retryWhen, delayWhen } from 'rxjs/operators';

// self-defined objects
import { companySummary } from '../models/companySummary';

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
}
