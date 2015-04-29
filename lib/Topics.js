'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  Image,
  ListView,
  View,
  TouchableHighlight,
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
      <TouchableHighlight
        onPress={() => this.props.onTopicPress(topic)}>
        <View style={styles.topic}>
          <View style={[styles.avatar, topic.viewed ? styles.viewed : {}]}>
            <Image
              source={{uri: 'http:' + topic.member.avatar_large}}
              style={styles.avatarImage}
            />
          </View>
          <View style={[styles.title, topic.viewed ? styles.viewed : {}]}>
            <Text style={styles.titleText}>{topic.title}</Text>
          </View>
          <View style={[styles.replies, topic.have_new_replies ? styles.have_new_replies : {}]}>
            <View style={styles.repliesBackground}>
              <Text style={styles.repliesText}>{topic.replies}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
  viewed: {
    opacity: 0.4
  },
  replies: {
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  have_new_replies: {
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
