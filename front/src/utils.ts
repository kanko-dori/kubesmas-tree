export const zeroPadding = (num: number, length = 2) => {
  return ('0'.repeat(length) + num).substr(-length);
};