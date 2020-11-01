import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { SpinnerService } from '../../services/spinner.service';
import { DataServiceService } from '../../services/data-service.service';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';
import { portfolioEntry } from '../../models/portfolioEntry';
import { portfolioDisplayItem } from '../../models/portfolioDisplayItem';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
//pop up news window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsWindowComponent } from '../news-window/news-window.component';
import { StockbuyComponent } from '../stockbuy/stockbuy.component';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  showPortfolioList: boolean = false;
  myPortfolio: portfolioEntry[] = [];
  myPortfolioTickers: string[] = [];
  myPortfolioDisplay = [];
  tickerNameMap = new Map();
  subscription: Subscription;
  constructor(
    public modalService: NgbModal,
    public dataService: DataServiceService,
    public portfolioManager: PortfoliomanagerService,
    public spinnerService: SpinnerService,
    public componentLayoutService: ComponentLayoutServiceService) {
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear

    //check price every 15s
    const source = interval(15000);//set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val => {
      console.log("called portfolio 15s subscription")
      let ticker_query = this.portfolioManager.getPortfolioTickerList().join(",");
      this.dataService.getPrice(ticker_query).subscribe(data => {
        var newPortfolioDisplay = [];
        var portfolioList = this.portfolioManager.getPortfolioList();
        for (let stock of data) {
          for (let portfolioStock of portfolioList) {
            if (stock.ticker.toLowerCase() == portfolioStock.ticker.toLowerCase()) {
              var ticker = stock.ticker.toUpperCase();
              var name = portfolioStock.name;
              var currPrice = stock.last.toFixed(2);
              var change = (stock.last - stock.prevClose).toFixed(2);
              var changePercent = "%" + (((stock.last - stock.prevClose) / stock.prevClose) * 100).toFixed(2);
              var numShares = portfolioStock.numShares.toFixed(0);
              var avgPrice = portfolioStock.avgPrice.toFixed(2);
              var totalCost = portfolioStock.cost.toFixed(2);
              var marketVal = (stock.last * portfolioStock.numShares).toFixed(2);
              var portfolioDisplayNewItem: portfolioDisplayItem = new portfolioDisplayItem(ticker,
                name, currPrice, change, changePercent, numShares, avgPrice, totalCost, marketVal);
              newPortfolioDisplay.push(portfolioDisplayNewItem);
            }
          }
          this.myPortfolioDisplay = newPortfolioDisplay;
          console.log("inside my portfolio display", JSON.stringify(this.myPortfolioDisplay))
        }
      })
    })
  }

  ngOnInit(): void {
    this.portfolioManager.portfolioChange$.
      subscribe(data => {
        console.log("portfolio change detected");
        for (var i = 0; i < this.myPortfolioDisplay.length; i++) {
          if (this.myPortfolioDisplay[i].ticker.toLowerCase() == data) {
            

            console.log("portfolio change: stock;s position now changed to non-zero");
            var newPortfolioList = this.portfolioManager.getPortfolioList();
            var newPortfolioListDisplay = this.myPortfolioDisplay;
            for (let stock of newPortfolioList) {
              if (stock.ticker.toLowerCase() == data) {
                if (stock.numShares == 0) {//check if the stock position is empty
                  console.log("portfolio change: stock;s position now changed to zero");
                  this.myPortfolioDisplay = this.myPortfolioDisplay.splice(i, 1);
                  break;
                }
                else {
                  newPortfolioListDisplay[i].numShares = stock.numShares.toFixed(2);
                  newPortfolioListDisplay[i].avgPrice = stock.avgPrice.toFixed(2);
                  newPortfolioListDisplay[i].totalCost = stock.cost.toFixed(2);
                  newPortfolioListDisplay[i].marketVal = (stock.numShares * newPortfolioListDisplay[i].currPrice).toFixed(2);
                  this.myPortfolioDisplay = newPortfolioListDisplay;
                  console.log("portfolio change: the updated portfolio display: ", JSON.stringify(this.myPortfolioDisplay));
                  break;
                }
              }
            }

          }
        }
      })
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showPortfolioList = true;
    console.log(this.showPortfolioList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showBuyDialog(ticker: string, name: string, isBuy: boolean) {
    let component = StockbuyComponent;
    const modelRef = this.modalService.open(component, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    modelRef.componentInstance.ticker = ticker;
    modelRef.componentInstance.name = name;
    modelRef.componentInstance.isBuy = isBuy;
  }

}
