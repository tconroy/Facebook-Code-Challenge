/*
Components:
  * Calendar
    * Timeline
    * Events
*/


// var Calendar = React.createClass({
//   render: function() {
//     return (
//       <p>{this.props.message}</p>
//     )
//   }
// });
// React.render(
//   <Calendar message={'this is the calendar'}/>,
//   document.getElementById('calContainer')
// );

// var Timeline = React.createClass({
//   render: function() {
//     return (
//       <p hi />
//     )
//   }
// });
//
// React.render(
//   new Timeline({times: ['9:00', '9:30', '10:00', '10:30']}),
//   document.getElementById('calContainer')
// );

var EventCalendar = React.createClass({displayName: "EventCalendar",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(Timeline, null), 
        React.createElement(CalEvents, null)
      )
    );
  }
});

var Timeline = React.createClass({displayName: "Timeline",
  render: function() {
    return (
      React.createElement("p", null, "cal timeline here")
    );
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