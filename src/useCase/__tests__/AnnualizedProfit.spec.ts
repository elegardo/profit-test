import { AnnualizedProfit } from '../AnnualizedProfit';

describe('generate', () => {

  test('should return correct value when prices is empty', () => {
    const useCase: AnnualizedProfit = new AnnualizedProfit();
    const annualizedExpected = 0.13118745596233694;
    const someProfits = [0.2464, 0.2732, 0.1103 , 0.1338 , 0.0643 , -0.0146];

    expect(useCase.generate(someProfits)).toBe(annualizedExpected);
  });


});
