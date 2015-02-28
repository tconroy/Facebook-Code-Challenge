// var Calendar = require('../build/Calendar.js'),
//     CalEvent = require('../build/CalEvent.js'),
//     Timeline = require('../build/Timeline.js');

// var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
// var TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];

// React.render(
//   <Calendar eventItems={SAMPLE_EVENTS} times={TIME_OPTS} />,
//   document.getElementById('calendar')
// );

define(function(require) {

var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}],
      TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];

  var Calendar = require('../build/Calendar.js'),
      CalEvent = require('../build/CalEvent.js'),
      Timeline = require('../build/Timeline.js');

  React.render(
    React.createElement(Calendar, {eventItems: SAMPLE_EVENTS, times: TIME_OPTS}),
    document.getElementById('calendar')
  );

});