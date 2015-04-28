var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
} = React;

module.exports = React.createClass({
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Settings',
          component: SettingsComponent,
          passProps: this.props
        }}
      />
    );
  }
});

var SettingsComponent = React.createClass({
  render() {
    return (
      <View style={styles.view}>
        <Text>Settings</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});