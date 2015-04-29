'use strict';

var React = require('react-native');

var {
  StyleSheet,
  WebView
} = React;

var enssl = require('./util/enssl')

module.exports = React.createClass({
  render() {
    return (
      <WebView
        style={styles.webView}
        url={enssl(this.props.url)}
      />
    );
  },
});

var styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
