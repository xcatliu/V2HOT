'use strict';

var React = require('react-native');

var TabBars = require('./TabBars');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

module.exports = React.createClass({
  getInitialState() {
    return {
      topics: [],
      currentTab: 'Hot'
    };
  },
  componentDidMount() {
    this.fetchTopics()
      .then((topics) => this.setState({topics: topics}))
      .catch((err) => {throw err});
  },
  handleCurrentTabChange(currentTab) {
    this.setState({currentTab: currentTab});
  },
  fetchTopics() {
    return new Promise((resolve, reject) => {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
  },
  render() {
    return (
      <TabBars
        {...this.state}
        onCurrentTabChange={this.handleCurrentTabChange}
      />
    );
  },
});
