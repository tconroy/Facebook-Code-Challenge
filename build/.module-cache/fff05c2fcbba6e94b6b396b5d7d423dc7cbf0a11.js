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
        React.createElement(CalEvents, {events: this.props.input})
      )
    );
  }
});

// ========================================

var Timeline = React.createClass({displayName: "Timeline",

  render: function() {
    var times = this.props.times;

    console.log( typeof times );

    return(
      React.createElement("ol", null, 
        times.map(function(time) {
          return (
            React.createElement("li", {key: time}, time),
            React.createElement("li", {key: time+':30'}, time+':30')
          );
        })
      )
    );
  }
});

// ========================================

var CalEvents = React.createClass({displayName: "CalEvents",
  render: function() {
    return (
      React.createElement("p", null, "cal events here")
    );
  }
});

// ========================================

var SAMPLE_EVENTS = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
var TIME_OPTS = [9,10,11,12,1,2,3,4,5,6,7,8,9];

React.render(
  React.createElement(EventCalendar, {input: SAMPLE_EVENTS, times: TIME_OPTS}),
  document.getElementById('calContainer')
);