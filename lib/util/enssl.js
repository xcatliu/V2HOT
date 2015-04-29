module.exports = function(url) {
  if (url.indexOf('https://') === 0) {
    return url;
  }
  if (url.indexOf('http://') === 0) {
    return url.replace('http://', 'https://');
  }
  return url;
}