import { tick } from '@angular/core/testing';

export class portfolioDisplayItem {
    ticker: string;
    name: string;
    cost: string;
    numShares: string;
    avgPrice: string;
    change: string;
    currentPrice:string;
    marketValue:string;



    constructor(ticker:string, name:string, cost:string, 
            numShares:string, avgPrice:string, change:string,
            currentPrice:string, marketValue:string) {
        this.ticker = ticker;
        this.name = name;
        this.cost = cost;
        this.numShares = numShares;
        this.avgPrice = avgPrice;
        this.change = change;
        this.currentPrice = currentPrice;
        this.marketValue = marketValue;
    }
}