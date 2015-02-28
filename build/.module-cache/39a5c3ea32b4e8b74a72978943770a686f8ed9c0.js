var Greeting = React.createClass({displayName: "Greeting",
  render: function() {
    return (
      React.createElement("p", null, this.props.message)
    )
  }
});
setInterval(function() {
  var messages = ['Hello, World', 'Hello, Planet', 'Hello, Universe']
  var randomMessage = messages[Math.floor((Math.random() * 3))]

  React.render(
    React.createElement(Greeting, {message: randomMessage}),
    document.getElementById('calendar')
  )
}, 2000);


var Calendar = React.createClass({displayName: "Calendar",
  render: function() {
    return (
      React.createElement("p", null, this.props.message)
    )
  }
});
React.render(
  React.createElement(Calendar, {message: 'thisIsATest'}),
  document.getElementById('calContainer')
);