import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { DataServiceService } from '../../services/data-service.service';
import {SpinnerService } from '../../services/spinner.service';
import { tickerPrice } from '../../models/tickerPrice';
import { watchListDisplayItem } from '../../models/watchListDisplayItem';
import { watchListStock } from '../../models/watchListStock';
import { Router } from '@angular/router';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, AfterViewInit {

  myWatchList:watchListStock[];
  myWatchListDisplay: watchListDisplayItem[] = [];
  showWatchList = false;
  tickerList:string[] = [];
  subscription: Subscription;
  deletedTicker:string;

  constructor(
    public router: Router,
    public dataService:DataServiceService,
    public watchlistmanager:WatchlistmanagerService,
    public componentLayoutService:ComponentLayoutServiceService,
    public spinnerService: SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible();
    this.myWatchList = this.watchlistmanager.getWatchList();
    //init watchlist
    
    //check price every 15s
    const source = interval(15000); //set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val => {
      console.log("called watchlist 15s subscription")
        this.watchlistmanager.createMyStocklist().subscribe(data=>
          { 
            var newmyWatchListDisplay =[];
            for (let stock of data) {
              var ticker = stock.ticker;
              for (let watch of this.myWatchList) {
                if (ticker.toLowerCase()==watch.ticker.toLowerCase()) {
                  this.tickerList.push(ticker.toLowerCase());
                  var currPrice = stock.last.toFixed(2);
                  var change = (stock.last - stock.prevClose).toFixed(2);
                  var changePercent = "%"+ ((stock.last - stock.prevClose)*100/stock.prevClose).toFixed(2);
                  var watchListDisplayNewItem: watchListDisplayItem = new watchListDisplayItem(
                    watch.name, watch.ticker.toUpperCase(), currPrice, change, changePercent);
                    newmyWatchListDisplay.push(watchListDisplayNewItem);
                }
              }
            }
            this.myWatchListDisplay = newmyWatchListDisplay;
          },
          err => console.log("there is an error")
        );
    })

   
  }

  ngOnInit(): void {
    this.watchlistmanager.watchlistChange$.
      subscribe(data =>{
        if(data.length == 0) {
          this.myWatchListDisplay =[];
        }
        else {
          console.log("inside filter  in detect change");
          this.myWatchListDisplay = this.myWatchListDisplay.filter(item=>(item.ticker).toLowerCase()!=this.deletedTicker.toLowerCase());
          console.log("current display (filtered): ", JSON.stringify(this.myWatchListDisplay))
        }
      }
    )
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showWatchList = true;
    console.log(this.showWatchList);
  }

  onClick(ticker:string) {
    this.router.navigate(["details/",ticker])
  }

  removeTicker(ticker:string) {
    this.deletedTicker =ticker;
    this.watchlistmanager.deleteTicker(ticker);
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/watchlist']);
  // }); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
