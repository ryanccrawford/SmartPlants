module.exports = {
  lower: function(word) {
    return word.toLowerCase();
  },
  ifEquals: function(arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
  percent: function(num, den) {
    return parseInt((num / den) * 100);
  }
};
