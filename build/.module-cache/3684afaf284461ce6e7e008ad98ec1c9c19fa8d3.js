var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
var TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];

/*
Components:
  * Calendar
    * Timeline
    * Events
*/

var EventCalendar = React.createClass({displayName: "EventCalendar",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Timeline, {times: this.props.times}), 
        React.createElement(CalEvents, {className: "events", eventItems: this.props.eventItems})
      )
    );
  }
});

// ========================================



// ========================================



// ========================================

React.render(
  React.createElement(EventCalendar, {eventItems: SAMPLE_EVENTS, times: TIME_OPTS}),
  document.getElementById('calendar')
);