'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
} = React;

module.exports = React.createClass({
  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  },
  render() {
    return (
      <ListView
        dataSource={this.dataSource.cloneWithRows(this.props.topics)}
        renderRow={this.renderTopic}
      />
    );
  },
  renderTopic(topic: Object) {
    return (
      <View style={styles.topic}>
        <View style={styles.avatar}>
          <Image
            source={{uri: 'http:' + topic.member.avatar_large}}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{topic.title}</Text>
        </View>
        <View style={styles.replies}>
          <View style={styles.repliesBackground}>
            <Text style={styles.repliesText}>{topic.replies}</Text>
          </View>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  topic: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomColor: '#d9d9d9', // Picked from WeChat
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 18,
  },
  replies: {
    borderRadius: 8,
    backgroundColor: '#aab0c6',
  },
  repliesBackground: {
    marginLeft: 10,
    marginRight: 10,
  },
  repliesText: {
    fontSize: 14,
    lineHeight: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
