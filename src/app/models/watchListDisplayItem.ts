export class watchListDisplayItem {
    name: string;
    ticker: string;
    currPrice: string;
    change: string;
    changePercent: string;

    constructor(name, ticker, currPrice, change, changePercent) {
        this.name = name;
        this.ticker = ticker;
        this.currPrice = currPrice;
        this.change = change;
        this.changePercent = changePercent;
    }
}

