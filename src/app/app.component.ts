import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-web-app';
  text = ""
  stocks = [ 
    { symbol: 'TSLA', name: 'Tesla, Inc.'},
    { symbol: 'MSFT', name: 'Microsoft Corporation'},
    { symbol: 'SPCE', name: 'Virgin Galactic'},
    { symbol: 'CVS', name: 'CVS Pharmacy'},
  ];
  messages = this.http.get<any>('http://localhost:80').subscribe(data =>this.text=JSON.stringify(data));
  constructor(private http: HttpClient) {}
  
}
