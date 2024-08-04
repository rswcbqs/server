import Decimal from 'decimal.js';

// 解决js精度丢失问题
export const calc = (initialValue: number | string) => {
  let value = new Decimal(initialValue);

  const chain = {
    plus: (num: number | string) => {
      value = value.plus(new Decimal(num));
      return chain;
    },
    minus: (num: number | string) => {
      value = value.minus(new Decimal(num));
      return chain;
    },
    times: (num: number | string) => {
      value = value.times(new Decimal(num));
      return chain;
    },
    div: (num: number | string) => {
      value = value.div(new Decimal(num));
      return chain;
    },
  };

  return chain;
};
