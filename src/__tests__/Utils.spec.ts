import { generateArrayOfYears } from '../Utils';

describe('generateArrayOfYears', () => {

  test('should return array with 2 years', () => {
    const startMock = new Date(2020, 0, 1);
    const endMock = new Date(2021, 11, 31);

    const result = generateArrayOfYears(startMock, endMock);

    expect(result).toStrictEqual([2020, 2021]);
  });

  test('should return array with 1 years', () => {
    const startMock = new Date(2021, 0, 1);
    const endMock = new Date(2021, 11, 31);

    const result = generateArrayOfYears(startMock, endMock);

    expect(result).toStrictEqual([2021]);
  });

});