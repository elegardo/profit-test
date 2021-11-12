import { Price } from './Price';
import { AnnualizedProfit} from '../useCase/AnnualizedProfit';
import { SimpleProfit} from '../useCase/SimpleProfit';
import { generateArrayOfYears } from '../Utils';

export class Stock {

  private _prices: Array<Price>;
  private _simpleProfit: SimpleProfit;
  private _annualizedProfit: AnnualizedProfit;

  constructor(simpleProfit: SimpleProfit, annualizedProfit: AnnualizedProfit ) {
    this._prices = [];
    this._simpleProfit = simpleProfit;
    this._annualizedProfit = annualizedProfit;
  }
  
  getPrice (date: Date): Price | undefined {
    return this._prices.find(x => x.date.getTime() === date.getTime());
  }

  pushOrReplacePrice(price: Price) {
    const index = this._prices.findIndex((el) => el.date.getTime() === price.date.getTime());
    index === -1 ? this._prices.push(price): this._prices[index] = price;
  }

  getAnnualizedProfit(start: Date, end: Date): number {
    const arrayOfYears = generateArrayOfYears(start, end);

    const arrayOfSimpleProfit = arrayOfYears.map(year => {
      return this._simpleProfit.generate(year, this._prices);
    });

    return this._annualizedProfit.generate(arrayOfSimpleProfit);
  }

  get prices(): Array<Price> {
    return this._prices;
  }

}