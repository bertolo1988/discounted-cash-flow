function roundNumber(num, decimalPlaces = 2) {
  if (num < 0) return -roundNumber(-num, decimalPlaces);
  var p = Math.pow(10, decimalPlaces);
  var n = num * p;
  var f = n - Math.floor(n);
  var e = Number.EPSILON * n;
  // Determine whether this fraction is a midpoint value.
  return f >= 0.5 - e ? Math.ceil(n) / p : Math.floor(n) / p;
}

module.exports = {
  roundNumber
};
