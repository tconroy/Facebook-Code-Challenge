require('Timeline');

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

var Timeline = React.createClass({displayName: "Timeline",

  render: function() {
    var times = this.props.times;
    return(
      React.createElement("ol", null, 
        times.map(function(time) {
          /* formats 24hr into 12hr with am/pm. also creates additional element for half-hour mark. */
          var period = (time < 12 ? 'AM' : 'PM');
          time = ((time + 11) % 12 + 1);
          var el = [];
          el.push( React.createElement("li", {key: time+':00'}, time+':00', React.createElement("span", null, period)) );
          el.push( React.createElement("li", {key: time+':30'}, time+':30') );
          return el;
        })
      )
    );
  }
});

// ========================================

var CalEvents = React.createClass({displayName: "CalEvents",
  render: function() {
    //var events = this.prop.events;
    // console.dir(this.prop.eventItems);
    return (React.createElement("div", {className: "events"}, "cal events here "));
  }
});

// ========================================

React.render(
  React.createElement(EventCalendar, {eventItems: SAMPLE_EVENTS, times: TIME_OPTS}),
  document.getElementById('calendar')
);