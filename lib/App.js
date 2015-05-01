'use strict';

var React = require('react-native');

var {
  AsyncStorage
} = React;

var TabBars = require('./TabBars');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

module.exports = React.createClass({
  getInitialState() {
    return {
      topics: [],
      currentTab: 'Hot'
    };
  },
  componentWillMount() {
    this.topicsMap = {};
  },
  componentDidMount() {
    this.getStorageTopics()
      .then(this.initTopics)
      .then(this.initTopicsMap)
      .then(this.fetchTopics)
      .then(this.updateTopics)
      .then(this.setStorageTopics)
      .catch((error) => {throw error});
  },
  getStorageTopics() {
    return AsyncStorage.getItem('topics');
  },
  initTopics(topics: Array) {
    return new Promise((resolve) => {
      this.setState({
        topics: (topics === null ? [] : JSON.parse(topics))
      }, resolve);
    });
  },
  initTopicsMap() {
    this.state.topics.forEach((topic) => {
      this.topicsMap[topic.id] = topic;
    });
  },
  fetchTopics() {
    return new Promise((resolve, reject) => {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then(resolve)
        .catch(reject);
    });
  },
  updateTopics(newTopics: Array) {
    return new Promise((resolve) => {
      newTopics.reverse().forEach((newTopic) => {
        if (!this.topicsMap[newTopic.id]) {
          Object.assign(newTopic, {
            viewed: false,
            have_new_replies: true
          });
          this.state.topics.unshift(newTopic);
          this.topicsMap[newTopic.id] = newTopic;
          return;
        }
        var topic = this.topicsMap[newTopic.id];
        Object.assign(topic, {
          have_new_replies: topic.have_new_replies || topic.replies < newTopic.replies
        }, newTopic)
      });
      this.forceUpdate(resolve);
    });
  },
  setStorageTopics() {
    return AsyncStorage.setItem('topics', JSON.stringify(this.state.topics));
  },
  handleCurrentTabChange(currentTab: String) {
    this.setState({currentTab: currentTab});
  },
  handleTopicPress(topic: Object) {
    topic.have_new_replies = false;
    topic.viewed = true;
    this.forceUpdate(() => this.setStorageTopics());
  },
  handleReloadTopics() {
    return this.fetchTopics()
      .then(this.updateTopics)
      .then(this.setStorageTopics);
  },
  render() {
    return (
      <TabBars
        {...this.state}
        onCurrentTabChange={this.handleCurrentTabChange}
        onTopicPress={this.handleTopicPress}
        onReloadTopics={this.handleReloadTopics}
      />
    );
  },
});
