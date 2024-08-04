import moment = require('moment');

export const transformerMoney = {
  to: (value: number) => value,
  from: (value: string) => {
    if (value === null) return value;
    return +(+value).toFixed(2);
  },
};

export const transformerTime = {
  to: (value: number) => value,
  from: (value: string) => {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
};
