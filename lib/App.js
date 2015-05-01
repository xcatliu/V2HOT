'use strict';

var React = require('react-native');

var {
  AsyncStorage,
} = React;

var Hot = require('./Hot');
var Settings = require('./Settings');

// Alert a message when catch an error.
var ErrorHandler = require('./ErrorHandler');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

module.exports = React.createClass({
  getInitialState() {
    return {
      topics: [],
      currentTab: 'Hot'
    };
  },
  componentWillMount() {
    // Use an object to store id-topic map, so search topic in topicsMap would be fast, within O(1).
    this.topicsMap = {};
  },
  componentDidMount() {
    this.getStorageTopics()
      .then(this.initTopics)
      .then(this.initTopicsMap)
      .then(this.fetchTopics)
      .then(this.updateTopics)
      .then(this.setStorageTopics)
      .catch(ErrorHandler);
  },
  // Return a Promise instance.
  getStorageTopics() {
    return AsyncStorage.getItem('topics');
  },
  initTopics(topics: Array) {
    return new Promise((resolve) => {
      this.setState({
        // AsyncStorage.getItem will return null if it is not exist.
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
      // Reverse newTopics because the topic will unshift into this.state.topics to get the right order.
      newTopics.reverse().forEach((newTopic) => {
        // Create if not exist.
        if (!this.topicsMap[newTopic.id]) {
          Object.assign(newTopic, {
            viewed: false,
            has_new_replies: true
          });
          this.state.topics.unshift(newTopic);
          this.topicsMap[newTopic.id] = newTopic;
          return;
        }
        // Update if exist.
        var topic = this.topicsMap[newTopic.id];
        Object.assign(topic, {
          has_new_replies: topic.has_new_replies || topic.replies < newTopic.replies
        }, newTopic);
      });
      this.forceUpdate(resolve);
    });
  },
  // AsyncStorage.setItem can only set string.
  setStorageTopics() {
    return AsyncStorage.setItem('topics', JSON.stringify(this.state.topics));
  },
  handleCurrentTabChange(currentTab: String) {
    this.setState({currentTab: currentTab});
  },
  handleTopicPress(topic: Object) {
    topic.has_new_replies = false;
    topic.viewed = true;
    this.forceUpdate(() => this.setStorageTopics());
  },
  handleReloadTopics() {
    return this.fetchTopics()
      .then(this.updateTopics)
      .then(this.setStorageTopics)
      .catch(ErrorHandler)
  },
  handleEraserAllTopicsDataPress() {
    this.topicsMap = {};
    this.setState({
      topics: [],
    }, () => this.setStorageTopics());
  },
  render() {
    if (this.state.currentTab === 'Hot') {
      return (
        <Hot
          {...this.state}
          onCurrentTabChange={this.handleCurrentTabChange}
          onTopicPress={this.handleTopicPress}
          onReloadTopics={this.handleReloadTopics}
        />
      );
    }
    if (this.state.currentTab === 'Settings') {
      return (
        <Settings
          {...this.state}
          onCurrentTabChange={this.handleCurrentTabChange}
          onEraserAllTopicsDataPress={this.handleEraserAllTopicsDataPress}
        />
      )
    }
  },
});
