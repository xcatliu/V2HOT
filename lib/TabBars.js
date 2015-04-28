'use strict';

var React = require('react-native');

var {
  TabBarIOS
} = React;

var Hot = require('./Hot');
var Settings = require('./Settings');

module.exports = React.createClass({
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title='Hot'
          icon={require('image!hot')}
          selected={this.props.currentTab === 'Hot'}
          onPress={() => this.props.onCurrentTabChange('Hot')}>
          <Hot {...this.props} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Settings'
          icon={require('image!settings')}
          selected={this.props.currentTab === 'Settings'}
          onPress={() => this.props.onCurrentTabChange('Settings')}>
          <Settings {...this.props} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },
});
