var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
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
  handleEraserAllTopicsData() {
    AlertIOS.alert(
      'Confirm',
      'Are you sure to eraser all topics data? This operation is not reversible.',
      [
        {text: 'Cancel'},
        {text: 'Submit', onPress: () => this.props.onEraserAllTopicsData()},
      ]
    )
  },
  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.settingsGroup}>
          <TouchableHighlight onPress={this.handleEraserAllTopicsData}>
            <View style={styles.settingsItem}>
              <Text style={styles.settingsItemDangerText}>Eraser All Topics Data</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f1f0f5',
  },
  settingsGroup: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingsItem: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
  },
  settingsItemDangerText: {
    fontSize: 16,
    lineHeight: 18,
    color: 'red',
  },
});