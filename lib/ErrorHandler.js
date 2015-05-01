var React = require('react-native');

var {
  AlertIOS,
} = React;

module.exports = function(err) {
  AlertIOS.alert(
    'An Error Occured',
    err.message + '\nPlease try again or send us a feedback.',
    [
      {text: 'OK'},
    ]
  )
};
