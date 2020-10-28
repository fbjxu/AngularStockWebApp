import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { DataServiceService } from '../../services/data-service.service';
import {SpinnerService } from '../../services/spinner.service';
import { tickerPrice } from '../../models/tickerPrice';
import { watchListDisplayItem } from '../../models/watchListDisplayItem';
import { watchListStock } from '../../models/watchListStock';
import { Router } from '@angular/router';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, AfterViewInit {

  myWatchList:watchListStock[];
  myStockList: tickerPrice[];
  myWatchListDisplay: watchListDisplayItem[] = [];
  showWatchList = false;

  constructor(
    public router: Router,
    public dataService:DataServiceService,
    public watchlistmanager:WatchlistmanagerService,
    public componentLayoutService:ComponentLayoutServiceService,
    public spinnerService: SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible();
   
  }

  ngOnInit(): void {
    this.myWatchList = this.watchlistmanager.getWatchList();
    this.watchlistmanager.createMyStocklist().subscribe(data=>
      {
        this.myStockList = data;
        for (let stock of data) {
          var ticker = stock.ticker;
          for (let watch of this.myWatchList) {
            if (ticker.toLowerCase()==watch.ticker.toLowerCase()) {
              var currPrice = stock.last.toFixed(2);
              var change = (stock.last - stock.prevClose).toFixed(2);
              var changePercent = "%"+ ((stock.last - stock.prevClose)*100/stock.prevClose).toFixed(2);
              var watchListDisplayNewItem: watchListDisplayItem = new watchListDisplayItem(
                watch.name, watch.ticker.toUpperCase(), currPrice, change, changePercent);
              this.myWatchListDisplay.push(watchListDisplayNewItem);
            }
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showWatchList = true;
  }

  onClick(ticker:string) {
    this.router.navigate(["details/",ticker])
  }

}
