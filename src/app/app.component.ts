import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { companySummary } from './models/companySummary';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-web-app';
  text: companySummary;
  // messages = this.http.get<any>('http://localhost:80').subscribe(data =>this.text=JSON.stringify(data));
  // messages2 = this.http.get<any>('http://localhost:80/api/summary/msft').subscribe(data =>this.text=data);
  constructor(private http: HttpClient, public componentLayoutService: ComponentLayoutServiceService) {}
  
}
