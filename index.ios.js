'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

var App = require('./lib/App');

var V2HOT= React.createClass({
  render() {
    return <App/>;
  },
});

AppRegistry.registerComponent('V2HOT', () => V2HOT);
