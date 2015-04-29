var React = require('react-native');

var {
  NavigatorIOS,
  StyleSheet
} = React;

var Topics = require('./Topics');
var Topic = require('./Topic');

module.exports = React.createClass({
  handleTopicPress(topic: Object) {
    this.props.onTopicPress(topic);
    this.refs.navigator.push({
      title: '/t/' + topic.id,
      component: Topic,
      passProps: topic
    });
  },
  componentWillReceiveProps(nextProps: Object) {
    // https://github.com/facebook/react-native/issues/795
    this.refs.navigator.replace(this.getTopicsRoute(nextProps));
  },
  getTopicsRoute(props: Object) {
    return {
      title: 'Topics',
      component: Topics,
      passProps: Object.assign({}, props, {
        onTopicPress: this.handleTopicPress,
      })
    };
  },
  render() {
    return (
      <NavigatorIOS
        ref='navigator'
        style={styles.container}
        initialRoute={this.getTopicsRoute(this.props)}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});