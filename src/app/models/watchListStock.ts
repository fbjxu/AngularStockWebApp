import { tick } from '@angular/core/testing';

export class watchListStock {
    ticker: string;

    constructor(ticker:string) {
        this.ticker = ticker;
    }
}