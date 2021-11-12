import { when } from 'jest-when';
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

describe('getPrice', () => {

  test('should return undefined when prices is empty', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockDate: Date = new Date(2019, 9, 18);

    expect(stock.getPrice(mockDate)).toBe(undefined);
  });

  test('should return Price when find Date', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockDate: Date = new Date(2019, 9, 18);
    const mockPrice = new Price(mockDate, 1000);

    stock.pushOrReplacePrice(mockPrice);

    expect(stock.getPrice(mockDate)).toBe(mockPrice);
  });
  
  test('should return undefined when dont find Date', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockDate: Date = new Date(2019, 9, 18);
    const mockPrice = new Price(mockDate, 1000);

    stock.pushOrReplacePrice(mockPrice);

    expect(stock.getPrice(new Date())).toBe(undefined);
  });

});

describe('pushOrReplacePrice', () => {

  test('should push new price when array is empty', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockPrice = new Price(new Date(2019, 9, 18), 1000);

    stock.pushOrReplacePrice(mockPrice);

    expect(stock.prices[0]).toBe(mockPrice);
  });

  test('should push new price when not found date', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockPrice1 = new Price(new Date(2019, 9, 19), 1000);
    const mockPrice2 = new Price(new Date(2019, 9, 1), 1000);
    const mockPrice3 = new Price(new Date(2019, 9, 18), 1000);

    stock.pushOrReplacePrice(mockPrice1);
    stock.pushOrReplacePrice(mockPrice2);
    stock.pushOrReplacePrice(mockPrice3);

    expect(stock.prices[0]).toBe(mockPrice1);
    expect(stock.prices[1]).toBe(mockPrice2);
    expect(stock.prices[2]).toBe(mockPrice3);
  });

  test('should replace new price when found date', () => {
    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    const mockPrice1 = new Price(new Date(2019, 9, 19), 1000);
    const mockPrice2 = new Price(new Date(2019, 9, 1), 1000);
    const mockPrice3 = new Price(new Date(2019, 9, 19), 2000);

    stock.pushOrReplacePrice(mockPrice1);
    stock.pushOrReplacePrice(mockPrice2);
    stock.pushOrReplacePrice(mockPrice3);

    expect(stock.prices.length).toBe(2);
    expect(stock.prices[0]).toBe(mockPrice3);
    expect(stock.prices[1]).toBe(mockPrice2);
  });  

});

describe('getAnnualizedProfit', () => {

  test('should return array with annualized return', () => {
    const startMock = new Date(2020, 0, 1);
    const endMock = new Date(2021, 11, 31);
    const arrayOfPrices = [
      new Price(new Date(2020, 0, 1), 2000),
      new Price(new Date(2020, 11, 31), 2800),
      new Price(new Date(2021, 0, 1), 3000),
      new Price(new Date(2021, 11, 31), 3600)
    ];

    const stock: Stock = new Stock(mockSimpleProfit, mockAnnualizedProfit);
    stock.pushOrReplacePrice(arrayOfPrices[0]);
    stock.pushOrReplacePrice(arrayOfPrices[1]);
    stock.pushOrReplacePrice(arrayOfPrices[2]);
    stock.pushOrReplacePrice(arrayOfPrices[3]);

    when(mockSimpleProfit.generate).calledWith(2020, arrayOfPrices).mockReturnValue(200);
    when(mockSimpleProfit.generate).calledWith(2021, arrayOfPrices).mockReturnValue(400);

    stock.getAnnualizedProfit(startMock, endMock);

    expect(mockSimpleProfit.generate).toHaveBeenCalledTimes(2);
    expect(mockAnnualizedProfit.generate).toHaveBeenCalledTimes(1);
    expect(mockAnnualizedProfit.generate).toHaveBeenCalledWith([ 200, 400 ]);
  });

});
