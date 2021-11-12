
export class AnnualizedProfit {

  generate(profitByYear: number[]): number {
    const years = profitByYear.length;
    const sumOfProfit = profitByYear.reduce((accumulator, p) => accumulator * (1 + p), 1);
    return Math.pow(sumOfProfit, (1 / years)) - 1;
  }

}