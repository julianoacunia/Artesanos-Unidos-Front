export const getColor = (color: string) => {
  return window.getComputedStyle(window.document.documentElement).getPropertyValue(color) || '#FFFFFF';
};

export default {
  formatCurrency: function (num: any) {
    return '$' + Number(num.toFixed(1)).toLocaleString() + ' '
  }
}

export const makeFileName = (name: any) => {
  const hash = new Date().getTime().toString().substr(8, 5);
  return `${hash}-${name.replace(/\s/g, '')}`;
};