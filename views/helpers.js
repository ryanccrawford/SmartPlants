module.exports = {
  lower: function(word) {
    return word.toLowerCase();
  },
  ifEquals: function(arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
  percent: function(value, maxValue, minValue) {
    if (!minValue) {
      minValue = 0;
    }
    //return parseInt(((value - minValue) / (maxValue - minValue)) * 100);
    return value * 100
  }
};
