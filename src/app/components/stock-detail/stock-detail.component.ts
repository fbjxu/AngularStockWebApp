import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LivestockService } from '../../services/livestock.service';
import { startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
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
  yellowStar;
  refreshRate:number = 15000; //divide 1000 to
  showWarning = false;
  public historyOptions: any;

  //stock info
  constructor(
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
      subscribe(starData =>this.yellowStar = starData
    );
    this.http.get<historyPrice[]>('/api/historychartsummary/'+this.ticker).subscribe(
      data=> {
        console.log("data ready for history chart: "+ JSON.stringify(data));
        var ohlc = [];
        var volume = [];
        var dataLength = data.length;
        var groupingUnits = [[
              'week',                         // unit name
              [1]                             // allowed multiples
          ], [
              'month',
              [1, 2, 3, 4, 6]
          ]];
      
        for (var i=0; i < dataLength; i++) {
          ohlc.push([
              Date.parse(data[i].date), // the date
              data[i].open, // open
              data[i].high, // high
              data[i].low, // low
              data[i].close // close
          ]);
  
          volume.push([
              Date.parse(data[i].date), // the date
              data[i].volume // the volume
          ]);
        }
        // console.log(JSON.stringify(ohlc));
        // console.log(JSON.stringify(volume));
        this.historyOptions = {
            rangeSelector: {
                selected: 2
            },
            title: {
                text: 'AAPL Historical'
            },
            subtitle: {
                text: 'With SMA and Volume by Price technical indicators'
            },

            yAxis: [{
                startOnTick: false,
                endOnTick: false,
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

            tooltip: {
                split: true
            },

            plotOptions: {
                series: {
                    dataGrouping: {
                        units: groupingUnits
                    }
                }
            },

            series: [{
                type: 'candlestick',
                name: 'AAPL',
                id: 'aapl',
                zIndex: 2,
                data: ohlc
            }, {
                type: 'column',
                name: 'Volume',
                id: 'volume',
                data: volume,
                yAxis: 1
            }, {
                type: 'vbp',
                linkedTo: 'aapl',
                params: {
                    volumeSeriesID: 'volume'
                },
                dataLabels: {
                    enabled: false
                },
                zoneLines: {
                    enabled: false
                }
            }, {
                type: 'sma',
                linkedTo: 'aapl',
                zIndex: 1,
                marker: {
                    enabled: false
                }
            }]
        }
        console.log("over here!!!!!!!!");
        HighchartsStockHistory.stockChart('text',this.historyOptions);
        console.log("over there!!!!!!!!");
      }
    );
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
