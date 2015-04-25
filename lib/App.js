'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Hello World
        </Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
