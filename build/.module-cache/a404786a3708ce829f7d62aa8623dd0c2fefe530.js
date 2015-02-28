/*
Components:
  * Calendar
    * Timeline
    * Events
*/

// var TIMES = [];

var EventCalendar = React.createClass({displayName: "EventCalendar",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Timeline, {times: "{['9:00', '9:30', '10:00', '10:30', '11:00']}"}), 
        React.createElement(CalEvents, null)
      )
    );
  }
});

var Timeline = React.createClass({displayName: "Timeline",

  render: function() {

  }
});

var CalEvents = React.createClass({displayName: "CalEvents",
  render: function() {
    return (
      React.createElement("p", null, "cal events here")
    );
  }
});


React.render(
  new EventCalendar( {input: [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]} ),
  document.getElementById('calContainer')
);