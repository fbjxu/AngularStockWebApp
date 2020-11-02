import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { DataServiceService } from '../../services/data-service.service';
import { historyPrice } from '../../models/historyPrice';
import { SpinnerService } from 'src/app/services/spinner.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
var HighchartsStock = require('highcharts/highstock'); 
var vbp = require('highcharts/indicators/volume-by-price');
let indicators = require('highcharts/indicators/indicators');


indicators(HighchartsStock);
Boost(HighchartsStock);
noData(HighchartsStock);
More(HighchartsStock);
noData(HighchartsStock);
More(HighchartsStock);
vbp(HighchartsStock);

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit, AfterViewInit {
  @Input() ticker:string;
  public options: any;
  constructor(
    public spinnerService:SpinnerService,
    private http: HttpClient,
    public dataService:DataServiceService
  ) { 
      this.spinnerService.visible();
  }

  ngOnInit(): void {
    this.dataService.getHistoryChart(this.ticker).subscribe(
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
        console.log(JSON.stringify(ohlc));
        console.log(JSON.stringify(volume));
        this.options = {
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
        HighchartsStock.stockChart('test',this.options);
      }
    )
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
  }

}
