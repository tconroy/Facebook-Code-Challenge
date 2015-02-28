/*
Components:
  * Calendar
    * Timeline
    * Events
*/


var Calendar = React.createClass({displayName: "Calendar",
  render: function() {
    return (
      React.createElement("p", null, this.props.message)
    )
  }
});
React.render(
  React.createElement(Calendar, {message: 'this is the calendar'}),
  document.getElementById('calContainer')
);

var Timeline = React.createClass({displayName: "Timeline",
  render: function() {
    return (
      React.createElement("ul", null, React.createElement("li", null, this.props.message))
    )
  }
});
React.render(
  React.createElement(Timeline, {message: 'this is the timeline'}),
  document.getElementById('calContainer')
);