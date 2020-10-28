import { tick } from '@angular/core/testing';

export class watchListStock {
    ticker: string;
    name: string;

    constructor(ticker:string, name:string) {
        this.ticker = ticker;
        this.name = name;
    }
}