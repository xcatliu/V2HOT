'use strict';

var React = require('react-native');

var Topics = require('./Topics');

var REQUEST_URL = 'https://www.v2ex.com/api/topics/hot.json';

module.exports = React.createClass({
  getInitialState() {
    return {
      topics: []
    };
  },
  componentDidMount() {
    this.fetchTopics()
      .then((topics) => this.setState({topics: topics}))
      .catch((err) => {throw err});
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
      <Topics topics={this.state.topics}/>
    );
  },
});
