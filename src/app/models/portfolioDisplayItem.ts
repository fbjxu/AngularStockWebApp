import { tick } from '@angular/core/testing';

export class portfolioDisplayItem {
    ticker: string;
    name: string;
    currPrice:string;
    change: string;
    changePercent: string;
    numShares: string;
    avgPrice: string;
    totalCost: string;
    marketVal:string;



    constructor(ticker,name, currPrice, change, changePercent, numShares, avgPrice, totalCost, marketVal) {
        this.ticker = ticker;
        this.name = name;
        this.currPrice = currPrice;
        this.change = change;
        this.changePercent = changePercent;
        this.numShares = numShares;
        this.avgPrice = avgPrice;
        this.totalCost = totalCost;
        this.marketVal = marketVal;
    }
}