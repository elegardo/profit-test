import { Stock} from './Stock';

export class Portfolio {

  private _stocks: Array<Stock>;

  constructor(stocks: Array<Stock>) {
    this._stocks = stocks;
  }

  getProfit (start: Date, end: Date): number {
    const profit = this._stocks
      .map(stock => {
        const firstValue = stock.getPrice(start);
        const lastValue = stock.getPrice(end);
        if(firstValue && lastValue){
          return lastValue.value - firstValue.value;
        }
        else {
          return 0;
        }
      })
      .reduce((accumulator, value) => accumulator + value, 0);

    return profit;
  }
  
  getAnnualizedProfit (start: Date, end: Date): number {
    const profit = this._stocks.map(stock => {
      return stock.getAnnualizedProfit(start, end);
    })
      .reduce((accumulator, value) => accumulator + value, 0);
    
    return profit / this._stocks.length;
  }

  get stocks(): Array<Stock> {
    return this._stocks;
  }

}