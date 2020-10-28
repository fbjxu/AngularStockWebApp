import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LivestockService } from '../../services/livestock.service';

import { SpinnerService } from 'src/app/services/spinner.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements AfterViewInit, OnInit {

  ticker: string;
  showSummary: boolean = false;
  yellowStar=false;

  refreshRate:number = 15000; //divide 1000 to

  //stock info
  constructor(
    private watchlistmanager:WatchlistmanagerService,
    private livestockService: LivestockService,
    private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService, 
    private dataService: DataServiceService, private spinnerService:SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear
    this.ticker = this.route.snapshot.params['ticker']; //set ticker
    this.livestockService.liveStockServiceInit(this.ticker);
  }

  toggleStar() {
    this.yellowStar = !this.yellowStar;
  }

  addTicker() {
    this.watchlistmanager.addTicker(this.ticker, this.livestockService.liveStockData.name);
  }

  deleteTicker() {
    this.watchlistmanager.deleteTicker(this.ticker);
  }


  ngOnInit() {
    
    // this.reFreshPrice();
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showSummary = true;
  }
}
