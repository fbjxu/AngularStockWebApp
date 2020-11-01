import { Component, OnInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { SpinnerService } from '../../services/spinner.service';
import { DataServiceService } from '../../services/data-service.service';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';
import { portfolioEntry } from '../../models/portfolioEntry';
import { portfolioDisplayItem } from '../../models/portfolioDisplayItem';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  myPortfolio: portfolioEntry[] =[];
  myPortfolioTickers: string[] = [];
  myPortfolioDisplay =[];
  tickerNameMap = new Map();
  subscription: Subscription;
  constructor(
    public dataService: DataServiceService,
    public portfolioManager: PortfoliomanagerService,
    public spinnerService: SpinnerService,
    public componentLayoutService: ComponentLayoutServiceService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear
    for (let item of this.myPortfolio) {//get a reusable map for ticker and name
      this.tickerNameMap.set(item.ticker.toLowerCase(), item.name);
    }

    let ticker_query = this.myPortfolioTickers.join(",");
    //check price every 15s
    const source = interval(15000);//set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val => {
      console.log("called portfolio 15s subscription")
      let ticker_query = this.portfolioManager.getPortfolioTickerList().join(",");
      this.dataService.getPrice(ticker_query).subscribe(data => {
        var newPortfolioDisplay =[];
        for (let stock of data) {
          var ticker = stock.ticker.toUpperCase();
          var name = this.tickerNameMap.get(ticker.toLowerCase());

        }
      })
    })

    
  
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy():void {

  }

}
