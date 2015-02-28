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
      React.createElement("ul", null, 
        React.createElement("li", null, " ", this.props.times, " ")
      )
    )
  }
});
React.render(
  new Timeline({times: ['9:00', '9:30', '10:00', '10:30']}),
  document.getElementById('calContainer')
);