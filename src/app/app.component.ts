import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { SpinnerService } from 'src/app/services/spinner.service';
 
import {Location} from "@angular/common";

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'stock-web-app';
  isSpinning: Observable<boolean>;

  // messages = this.http.get<any>('http://localhost:80').subscribe(data =>this.text=JSON.stringify(data));
  // messages2 = this.http.get<any>('http://localhost:80/api/summary/msft').subscribe(data =>this.text=data);
  constructor(private http: HttpClient, public componentLayoutService: ComponentLayoutServiceService, private spinnerService: SpinnerService,
    private location: Location) {
  }

  ngOnInit() {//this is to ensure when back button is pressed, we still see search bar
    this.location.subscribe(x => {this.componentLayoutService.makeVisible();}); 
    this.isSpinning = this.spinnerService.getIsOpen();
    this.spinnerService.visible();
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    
  }

  
}
