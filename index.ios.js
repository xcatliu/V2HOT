'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var App = require('./lib/App');

var v2hot = React.createClass({
  render() {
    return <App/>;
  },
});

AppRegistry.registerComponent('v2hot', () => v2hot);
