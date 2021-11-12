import { when } from 'jest-when';
import { Portfolio } from '../Portfolio';
import { Price } from '../Price';
import { Stock } from '../Stock';

const mockSimpleProfit = {
  generate: jest.fn(),
};

const mockAnnualizedProfit = {
  generate: jest.fn(),
};

afterEach(() => {
  mockSimpleProfit.generate.mockClear();
  mockAnnualizedProfit.generate.mockClear();
});

describe('getProfit', () => {

  test('should return zero when stocks is empty', () => {
    const portfolio: Portfolio = new Portfolio([]);
    const profitExpected = 0;

    expect(portfolio.getProfit(new Date(), new Date())).toBe(profitExpected);
  });

  test('should return correct value when use two valid dates', () => {
    const start = new Date(2004, 0, 1);
    const end = new Date(2004, 11, 31);
    const profitExpected = 8000;

    const stock1: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    stock1.pushOrReplacePrice(new Price(new Date(2020, 0, 1), 2000));
    stock1.pushOrReplacePrice(new Price(new Date(2020, 11, 31), 5000));
    stock1.pushOrReplacePrice(new Price(new Date(2004, 0, 1), 3000));
    stock1.pushOrReplacePrice(new Price(new Date(2004, 11, 31), 7000));

    const stock2: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    stock2.pushOrReplacePrice(new Price(new Date(2020, 0, 1), 2000));
    stock2.pushOrReplacePrice(new Price(new Date(2020, 11, 31), 5000));
    stock2.pushOrReplacePrice(new Price(new Date(2004, 0, 1), 4000));
    stock2.pushOrReplacePrice(new Price(new Date(2004, 11, 31), 8000));

    const portfolio: Portfolio = new Portfolio([stock1, stock2]);

    expect(portfolio.getProfit(start, end)).toBe(profitExpected);
  });

  test('should return zero when dont found prices for that dates', () => {
    const start = new Date(2000, 0, 1);
    const end = new Date(2020, 11, 31);
    const profitExpected = 0;

    const stock1: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    stock1.pushOrReplacePrice(new Price(new Date(2020, 0, 1), 2000));
    stock1.pushOrReplacePrice(new Price(new Date(2020, 11, 31), 5000));
    stock1.pushOrReplacePrice(new Price(new Date(2004, 0, 1), 3000));
    stock1.pushOrReplacePrice(new Price(new Date(2004, 11, 31), 7000));

    const stock2: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    stock2.pushOrReplacePrice(new Price(new Date(2020, 0, 1), 2000));
    stock2.pushOrReplacePrice(new Price(new Date(2020, 11, 31), 5000));
    stock2.pushOrReplacePrice(new Price(new Date(2004, 0, 1), 4000));
    stock2.pushOrReplacePrice(new Price(new Date(2004, 11, 31), 8000));

    const portfolio: Portfolio = new Portfolio([stock1, stock2]);

    expect(portfolio.getProfit(start, end)).toBe(profitExpected);
  });

});

describe('getAnnualizedProfit', () => {
 
  test('should return annualized profit when use correct dates', () => {
    const firstDate = new Date(2020, 0, 1);
    const lastDate = new Date(2020, 11, 31);
    const resultExpected = 200;
    
    const stock1: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const stock2: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    
    when(mockSimpleProfit.generate).calledWith(2020, []).mockReturnValue(1500);
    when(mockAnnualizedProfit.generate).calledWith([1500]).mockReturnValue(200);

    const portfolio: Portfolio = new Portfolio([stock1, stock2]);

    const result = portfolio.getAnnualizedProfit(firstDate, lastDate);

    expect(mockSimpleProfit.generate).toHaveBeenCalledTimes(2);
    expect(mockAnnualizedProfit.generate).toHaveBeenCalledTimes(2);
    expect(result).toBe(resultExpected);
  });

});

describe('get', () => {
  test('should return stocks when Portfolio is initialized', () => {
    const stock1: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const stock2: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);

    const portfolio: Portfolio = new Portfolio([stock1, stock2]);

    expect(portfolio.stocks[0]).toBe(stock1);
    expect(portfolio.stocks[1]).toBe(stock2);
  });
});
