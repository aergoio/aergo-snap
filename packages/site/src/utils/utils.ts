/* eslint-disable jsdoc/require-returns */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-param-reassign */
export const shortenAddress = (address: string, num = 3) => {
  if (!address) {
    return '';
  }
  return (
    Boolean(address) &&
    `${address.substring(0, num + 2)}...${address.substring(
      address.length - num - 1
    )}`
  );
};

export const isValidAddress = (toCheck: string) => {
  return /^Am[0-9A-Za-z]{52}$/u.test(toCheck);
};

/**
 * Move decimal point in string by digits, positive to the right, negative to the left.
 * This extends the string if necessary.
 * Example: ("0.0001", 4 => "1"), ("0.0001", -4 => "0.00000001")
 *
 * @param str
 * @param digits
 */
export function moveDecimalPoint(str: string, digits: number): string {
  if (digits === 0 || str === '0') {
    return str;
  }

  if (str.indexOf('.') === -1) {
    str += '.';
  }
  let idx = str.indexOf('.');

  // Extend string to have enough space to move decimal point
  if (digits > str.length - idx) {
    str = str.padEnd(digits + idx + 1, '0');
  }

  if (digits < -idx) {
    str = str.padStart(str.length - idx - digits, '0');
  }

  // remove decimal point and reinsert at new location
  idx = str.indexOf('.');
  str = str.replace('.', '');
  str = `${str.substr(0, idx + digits)}.${str.substr(idx + digits)}`;

  // remove trailing 0 and .
  str = str.replace(/\.?0*$/, '');
  // remove leading 0
  str = str.replace(/^0+/, '');
  // add leading 0 before .
  str = str.replace(/^\./, '0.');
  return str;
}

export function formatTokenAmount(
  amount: string,
  unit: string,
  decimals: number
) {
  if (amount) {
    return `${moveDecimalPoint(amount, -decimals)}${unit ? ` ${unit}` : ''}`;
  }
}

export const amountWithDecimals = (amount: string, decimals: number) => {
  return String(+amount * Math.pow(10, decimals));
};
