/*
Components:
  * Calendar
    * Timeline
    * Events
*/

var TIMELINE_TIMES = [
  '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00',
  '5:30', '6:00', '6:30', '7:00', '7:30', '8:00', '8:30', '9:00'
];

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