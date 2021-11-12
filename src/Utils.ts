
export function generateArrayOfYears(start: Date, end: Date): number[]{
  const min = start.getFullYear();
  const max = end.getFullYear();
  const arrayOfYears = [];

  for(let i = min; i<= max; i++){
    arrayOfYears.push(i);
  }

  return arrayOfYears;
}