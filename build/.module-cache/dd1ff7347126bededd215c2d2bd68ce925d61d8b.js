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
  render: function() {
    var calEvents = this.state.calEvents;
    calEvents.sort(this.eventSorter);
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
      top: this.props.top + 'px',
      left: this.props.left + '%',
      height: this.props.height + 'px',
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

  render: function() {
    var times = this.props.times;
    return(
      React.createElement("ol", null, 
        "// format 24hr into 12hr with AM/PM.", 
        times.map(function(time, i) {
          var el = [];
          var isLastHr = ( times.length-1 === i ? true : false ); // dont add :30 for last element
          var period = (time < 12 ? 'AM' : 'PM');
          time = ((time + 11) % 12 + 1);
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
var TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];
React.render( React.createElement(Timeline, {times: TIME_OPTS}), document.getElementById('timeline') );
var cal = React.render( React.createElement(Calendar, {calEvents: SAMPLE_EVENTS, times: TIME_OPTS}), document.getElementById('calendar'));