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
    oldEventArr.sort(this.eventSorter);
    var newEventArr = [], n = oldEventArr.length;

    // for( var i=0; i<n; i++ ) {
    //   var currObj = oldEventArr[i];
    //   for ( var x=0; x<n; x++ ) {
    //     var nextObj = oldEventArr[x];
    //     if ( currObj.start <= nextObj.end && nextObj.start <= currObj.end ) {
    //       if ( 'undefined' === typeof currObj.siblings ) {
    //         currObj.siblings = 0;
    //         currObj.slotIndex = 0;
    //       } else {
    //         currObj.siblings++;
    //         nextObj.slotIndex++;
    //       }
    //     }
    //   console.log( 'event['+i+'] has slotIndex of ' + currObj.slotIndex + ' and total slots of ' + currObj.siblings );
    //   newEventArr.push(currObj);
    // }


    for( var i=0; i<n; i++ ) {
      var currObj = oldEventArr[i];
      for( var x=0; x<n; x++ ) {
        var nextObj = oldEventArr[x];
        if( currObj.start <= nextObj.end && nextObj.start <= currObj.end ) {
          if( 'undefined' === typeof currObj.siblings ) {
            currObj.siblings = 0;
            currObj.slotIndex = 0;
          } else {
            currObj.siblings++;
            nextObj.slotIndex++;
          }
        }
      }
      newEventArr.push(currObj);
    }


    // newEventArr[2].slotIndex = 1;
    // newEventArr[3].slotIndex = 0;
    // newEventArr[0].siblings = 1;
    // newEventArr[1].siblings = 2;
    // newEventArr[2].siblings = 2;
    // newEventArr[3].siblings = 2;

    return newEventArr;
  },

  render: function() {
    var calEvents = this.detectSiblings( this.state.calEvents );
    return (
      React.createElement("div", null, 
      calEvents.map(function(item, i){
          return(React.createElement(Event, {key: i, siblings: item.siblings, slotIndex: item.slotIndex, top: item.start, height: item.end - item.start}));
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
        cssClass  = "event",
        siblings  = this.props.siblings,
        slotIndex  = this.props.slotIndex;

    var width = 100 / siblings;
    var left = width * slotIndex;

    var eventStyle = {
      top: this.props.top,
      left: left + '%',
      height: this.props.height,
      width: width + '%'
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