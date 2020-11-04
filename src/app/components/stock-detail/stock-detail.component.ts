import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LivestockService } from '../../services/livestock.service';
import { startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';
import { HttpClient } from '@angular/common/http';
//pop up news window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsWindowComponent } from '../news-window/news-window.component';
import { StockbuyComponent } from '../stockbuy/stockbuy.component';

//history chart
import * as Highcharts from 'highcharts';
import { historyPrice } from '../../models/historyPrice';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
var HighchartsStockHistory = require('highcharts/highstock'); 
var vbp = require('highcharts/indicators/volume-by-price');
let indicators = require('highcharts/indicators/indicators');


indicators(HighchartsStockHistory);
Boost(HighchartsStockHistory);
noData(HighchartsStockHistory);
More(HighchartsStockHistory);
noData(HighchartsStockHistory);
More(HighchartsStockHistory);
vbp(HighchartsStockHistory);


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements AfterViewInit, OnInit {

  ticker: string;
  showSummary: boolean = false;
  yellowStar:boolean;
  addWatchListAlert:boolean = false;
  removeWatchListAlert:boolean = false;
  buySuccess:boolean = false;
  refreshRate:number = 15000; //divide 1000 to
  showWarning = false;
  public historyOptions: any;
  localTesting:string = "http://localhost:8080";
  //stock info
  constructor(
    public portfolioManager: PortfoliomanagerService,
    public http:HttpClient,
    private modalService: NgbModal, 
    private watchlistmanager:WatchlistmanagerService,
    private livestockService: LivestockService,
    private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService, 
    private dataService: DataServiceService, private spinnerService:SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear
    this.ticker = this.route.snapshot.params['ticker']; //set ticker
    this.dataService.getSummary(this.ticker).subscribe(
      data=> {
        if((data.ticker?data.ticker:"").length == 0) {
          this.showWarning = true;
          this.showSummary = false;
        }
      }
    )
    this.livestockService.liveStockServiceInit(this.ticker);
    this.yellowStar = this.watchlistmanager.yellowStar(this.ticker);
    console.log(this.yellowStar);
    this.watchlistmanager.getYellowStar().
      subscribe(starData =>{
        this.yellowStar = starData;
        if (starData) {
          this.addWatchListAlert = true;
          this.removeWatchListAlert = false;
          setTimeout(()=>{ this.addWatchListAlert = false; }, 5000);
          
        }
        else {
          this.removeWatchListAlert = true;
          this.addWatchListAlert = false;
          setTimeout(()=>{ this.removeWatchListAlert = false; }, 5000);
        }
      }
    );

    this.portfolioManager.buySuccess$.subscribe(
      buyData => {
        this.buySuccess = true;
        setTimeout(()=>{ this.buySuccess = false; }, 5000);
      }
    )
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

  removeAlertForAddWatchList() {
    this.addWatchListAlert = false;
  }

  removeAlertForRemoveWatchList() {
    this.removeWatchListAlert = false;
  }

  removeAlertForBuySuccess() {
    this.buySuccess = false;
  }


  ngOnInit() {
    // this.reFreshPrice();
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.spinnerService.invisible();
      console.log("ngafter in stock detail " +this.livestockService.liveStockData.ticker);
      if(this.showWarning == false) {
        this.showSummary = true;
      }
    }, 1500);
    
    
  }

  showBuyDialog() {
    let component = StockbuyComponent;
    const modelRef = this.modalService.open(component, { ariaLabelledBy: 'modal-basic-title', size: 'md'});
    modelRef.componentInstance.ticker = this.ticker;
    modelRef.componentInstance.name = this.livestockService.liveStockData.name;
    modelRef.componentInstance.isBuy = true;
    modelRef.componentInstance.price = this.livestockService.liveStockData.last;
  }

  ngOnDestroy() {
    this.livestockService.destroyCleanup();
  }
}
