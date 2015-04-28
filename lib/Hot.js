var React = require('react-native');

var {
  NavigatorIOS,
  StyleSheet
} = React;

var Topics = require('./Topics');

module.exports = React.createClass({
  componentWillReceiveProps(nextProps: Object) {
    // https://github.com/facebook/react-native/issues/795
    this.refs.navigator.replace(this.getTopicsRoute(nextProps));
  },
  getTopicsRoute(props: Object) {
    return {
      title: 'Topics',
      component: Topics,
      passProps: props
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