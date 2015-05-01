'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  ScrollView,
} = React;

var pkg = require('../package.json');

module.exports = React.createClass({
  getPackageMessage() {
    return 'name version description repository author license homepage'
      .split(' ')
      .reduce((prev, key) => {
        prev[key] = pkg[key];
        return prev;
      }, {});
  },
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.view}>
  	  	  <Text style={styles.text}>{JSON.stringify(this.getPackageMessage(), null, 2)}</Text>
        </View>
  	  </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  view: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Courier',
  },
});
