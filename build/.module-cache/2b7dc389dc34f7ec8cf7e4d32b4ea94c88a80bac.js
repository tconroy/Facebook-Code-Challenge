/** =============
 * Calendar class. Displays an array of objects as a visual event calendar.
 * @param  {[type]}   [description]
 * @param  {Object}   [description]
 * @return {[type]}   [description]
 */
var Calendar = React.createClass({displayName: "Calendar",
  getInitialState: function() {
    return { calEvents: SAMPLE_EVENTS };
  },

  eventSorter: function(curr, next) {
    return curr.start - next.start;
  },

  // loop through, see if one has a start/end between another's start/end
  detectSiblings: function( oldEventArr ) {
    var newEventsArr = [];
    var n = oldEventArr.length;
    oldEventArr.map(function(item, i){
      // 1) loop through oldEventArr as x
      for ( var i=0; i<n; i++ ) {
        // 2) if x start/end overlap with this start/end, add +1 sibling to object
        if ( item.start <= oldEventArr[i].end && oldEventArr[i].start <= item.end ) {
          item.siblings += 1;
        }
      }
      // 3) push to array
      newEventsArr.push(item);
    });
    console.dir(newEventsArr);
    return newEventsArr;
  },

  render: function() {
    // var calEvents = this.state.calEvents;
    // calEvents.sort(this.eventSorter);
    // calEvents = this.detectSiblings( calEvents );
    var calEvents = this.detectSiblings( this.state.calEvents );
    return (
      React.createElement("div", null, 
      calEvents.map(function(item, i){
          return( React.createElement(Event, {key: i, top: item.start, left: "", width: "", height:  item.end - item.start}) );
      })
      )
    );
  }
});

/** =============
 * Creates a single HTML entity to represent an event inside the Calendar class.
 * @param
 * @return {[type]}   [description]
 */
var Event = React.createClass({displayName: "Event",
  render: function() {
    var title     = "Sample Title",
        location  = "Sample Location"
        cssClass  = "event";

    var eventStyle = {
      top: this.props.top,
      left: this.props.left + '%',
      height: this.props.height,
      width: this.props.width + '%'
    };

    return (
      React.createElement("div", {className: cssClass, style: eventStyle}, 
        React.createElement("dt", null, title), 
        React.createElement("dd", null, location)
      )
    );
  }
});


/** =============
 * Creates the numerical timeline to the left of the Calendar class
 * @param  {[type]}   [description]
 * @return {[type]}   [description]
 */
var Timeline = React.createClass({displayName: "Timeline",

  formatPeriod: function(time) {
    return time < 12 ? 'AM' : 'PM';
  },

  formatHour: function(time) {
    return ((time+11) % 12 + 1);
  },

  render: function() {
    var times = this.props.times;
    var that = this;
    return(
      React.createElement("ol", null, 
        times.map(function(time, i) {
          /* formats 24hr into 12hr AM/PM. Do not incude :30 mark for last element.*/
          var el = [],
              isLastHr = ( times.length-1 === i ? true : false ),
              period = that.formatPeriod(time),
              time = that.formatHour(time);

          el.push( React.createElement("li", {key: time+':00'}, time+':00', React.createElement("span", null, period)) );
          if ( !isLastHr ) {
            el.push( React.createElement("li", {key: time+':30'}, time+':30') );
          }
          return el;
        })
      )
    );
  }
});

// =============
var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
React.render( React.createElement(Timeline, {times: [9,10,11,12,13,14,15,16,17,18,19,20,21]}), document.getElementById('timeline') );
var cal = React.render( React.createElement(Calendar, {calEvents: SAMPLE_EVENTS}), document.getElementById('calendar'));