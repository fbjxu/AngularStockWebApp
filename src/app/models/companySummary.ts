import { end } from '@popperjs/core';

export class companySummary {

    constructor(description: string,
        endDate: string,
        exchangeCode: string,
        startDate: string,
        name: string,
        ticker: string) {
        this.description = description;
        this.endDate = endDate;
        this.exchangeCode = exchangeCode;
        this.startDate = startDate;
        this.name = name;
        this.ticker = ticker;
    }

    description: string;
    endDate: string;
    exchangeCode: string;
    startDate: string;
    name: string;
    ticker: string;
}