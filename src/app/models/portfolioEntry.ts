import { tick } from '@angular/core/testing';

export class portfolioEntry {
    ticker: string;
    name: string;
    cost: number;
    numShares: number;
    avgPrice: number;


    constructor(ticker:string, name:string, cost:number, 
            numShares:number, avgPrice:number) {
        this.ticker = ticker;
        this.name = name;
        this.cost = cost;
        this.numShares = numShares;
        this.avgPrice = avgPrice;

    }
}