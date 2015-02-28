var SAMPLE_EVENTS = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
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
        React.createElement(CalEvents, {class: "events", events: this.props.input})
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
          //var suffix = (time < 12 ? ' AM' : ' PM');

          var period = (time < 12 ? 'AM' : 'PM');

          time = ((time + 11) % 12 + 1); // convert to 12hr am/pm
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
    var events = this.prop.input;
    return (React.createElement("div", {className: "events"}, "cal events here ", events));
  }
});

// ========================================

React.render(
  React.createElement(EventCalendar, {input: SAMPLE_EVENTS, times: TIME_OPTS}),
  document.getElementById('calendar')
);