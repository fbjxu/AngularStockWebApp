import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { newsItem } from '../../models/newsItem';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() ticker: string;
  newsCollection:newsItem[] = []; 

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getApiResponse(this.ticker).then(
      data=> {
        this.newsCollection = data;
      }
    )
  }

  getApiResponse(ticker:string) {
    return this.http.get<newsItem[]>('http://localhost:80/api/news/'+ticker, {})
    .toPromise().then(res => {
        return res;
    })
}

}
