import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-web-app';
  stocks = [ 
    { symbol: 'TSLA', name: 'Tesla, Inc.'},
    { symbol: 'MSFT', name: 'Microsoft Corporation'},
    { symbol: 'SPCE', name: 'Virgin Galactic'},
    { symbol: 'CVS', name: 'CVS Pharmacy'},
  ];
  
}
