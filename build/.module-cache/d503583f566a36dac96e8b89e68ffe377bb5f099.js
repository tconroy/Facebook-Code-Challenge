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