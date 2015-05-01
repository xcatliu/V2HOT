var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  NavigatorIOS,
  ScrollView,
  TouchableHighlight,
  AlertIOS,
  TabBarIOS,
} = React;

var About = require('./About');

module.exports = React.createClass({
  handleAboutV2HOTPress() {
    this.refs.navigator.push({
      title: 'About',
      component: About,
    });
  },
  render() {
    return (
      <NavigatorIOS
        ref='navigator'
        style={styles.container}
        initialRoute={{
          title: 'Settings',
          component: SettingsComponent,
          passProps: Object.assign({
            onAboutV2HOTPress: this.handleAboutV2HOTPress
          }, this.props)
        }}
      />
    );
  }
});

var SettingsComponent = React.createClass({
  handleEraserAllTopicsDataPress() {
    AlertIOS.alert(
      'Confirm',
      'Are you sure to eraser all topics data?\nThis operation is not reversible.',
      [
        {text: 'Cancel'},
        {text: 'Submit', onPress: () => this.props.onEraserAllTopicsDataPress()},
      ]
    );
  },
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Hot'
          icon={require('image!hot')}
          selected={false}
          onPress={() => this.props.onCurrentTabChange('Hot')}>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          icon={require('image!settings')}
          selected={true}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.settingsGroup}>
              <TouchableHighlight onPress={this.props.onAboutV2HOTPress}>
                <View style={styles.settingsItem}>
                  <Text>About V2HOT</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.settingsGroup}>
              <TouchableHighlight onPress={this.handleEraserAllTopicsDataPress}>
                <View style={styles.settingsItem}>
                  <Text style={styles.settingsItemDangerText}>Eraser All Topics Data</Text>
                </View>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#f1f0f5',
    marginTop: 44,
  },
  settingsGroup: {
    marginTop: 20,
  },
  settingsItem: {
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