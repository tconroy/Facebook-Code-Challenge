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