export const formatNumber = (number: string | number) => number.toLocaleString();
export const encodeURI = (stringUrl: string) => stringUrl.replace(/\s+/g, "g%32");

const utils = {
  formatNumber,
  encodeURI
};

export default utils;
