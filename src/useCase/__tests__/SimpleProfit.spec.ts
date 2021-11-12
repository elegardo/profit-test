import { Price } from '../../model/Price';
import { SimpleProfit } from '../SimpleProfit';

describe('generate', () => {

  test('should return zero when prices is empty', () => {
    const useCase: SimpleProfit = new SimpleProfit();
    const someYear = 2021;
    const profitExpected = 0;
    const prices: Array<Price> = [];

    expect(useCase.generate(someYear, prices)).toStrictEqual(profitExpected);
  });
  
  test('should return zero when prices contain many years but not year expected', () => {
    const useCase: SimpleProfit = new SimpleProfit();
    const someYear = 2021;
    const profitExpected = 0;
    const prices = [];

    prices.push(new Price(new Date(2020, 0, 1), 2000));
    prices.push(new Price(new Date(2020, 11, 31), 5000));
    prices.push(new Price(new Date(2004, 0, 1), 3000));
    prices.push(new Price(new Date(2004, 11, 31), 7000));

    expect(useCase.generate(someYear, prices)).toStrictEqual(profitExpected);
  });

  test('should return correct value when prices contain many years', () => {
    const useCase: SimpleProfit = new SimpleProfit();
    const someYear = 2004;
    const profitExpected = 0.2;
    const prices = [];

    prices.push(new Price(new Date(2020, 0, 1), 2000));
    prices.push(new Price(new Date(2020, 11, 31), 5000));
    prices.push(new Price(new Date(2004, 0, 1), 3000));
    prices.push(new Price(new Date(2004, 11, 31), 3600));

    expect(useCase.generate(someYear, prices)).toStrictEqual(profitExpected);
  });

});
