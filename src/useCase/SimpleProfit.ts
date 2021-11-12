import { Price } from '../model/Price';

export class SimpleProfit {

  generate(year: number, prices: Array<Price>): number {
    const arrayOfPricesOrdered: Array<Price> = prices
      .filter(x => x.date.getFullYear() === year)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    if(arrayOfPricesOrdered.length > 1){
      const firstStockPriceOfYear = arrayOfPricesOrdered[0].value;
      const lastStockPriceOfYear = arrayOfPricesOrdered[arrayOfPricesOrdered.length-1].value;
  
      return (lastStockPriceOfYear - firstStockPriceOfYear) / firstStockPriceOfYear;
    }
    else {
      return 0;
    }
  }
}