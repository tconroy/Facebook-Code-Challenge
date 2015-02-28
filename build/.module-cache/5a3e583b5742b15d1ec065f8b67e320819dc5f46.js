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

  // detectSlots: function(oldEventArr) {
  //   oldEventArr.sort(this.eventSorter);
  //   var newEventArr = [],
  //     n = oldEventArr.length;

  //   for (var i = 0; i < n; i++) {
  //     var currObj = oldEventArr[i];
  //     if ('undefined' == typeof currObj.totalSlots) {
  //       currObj.slotIndex = 0;
  //       currObj.totalSlots = 0;
  //     }
  //     for (var x = 0; x < n; x++) {
  //       if (i == x) { // Event always overlaps itself, don't count it
  //         continue;
  //       }
  //       var nextObj = oldEventArr[x];
  //       if (currObj.start <= nextObj.end && nextObj.start <= currObj.end) {
  //         currObj.totalSlots++;
  //         nextObj.slotIndex++;
  //       }
  //     }
  //     newEventArr.push(currObj);
  //   }
  //   return newEventArr;
  // },

  // detectSlots: function(oldEventArr) {
  //   oldEventArr.sort(this.eventSorter);
  //   var newEventArr = [],
  //     n = oldEventArr.length;

  //   for (var i = 0; i < n; i++) {
  //     var currObj = oldEventArr[i];
  //     if ('undefined' == typeof currObj.totalSlots) {
  //       currObj.slotIndex = 0;
  //       currObj.totalSlots = 0;
  //     }
  //     for (var x = 0; x < n; x++) {
  //       if (i == x) { // Event always overlaps itself, don't count it
  //         continue;
  //       }
  //       var nextObj = oldEventArr[x];
  //       var overlap = (currObj.end > nextObj.start && nextObj.end < currObj.start);

  //       if (overlap) {
  //         currObj.totalSlots++;
  //         nextObj.slotIndex++;
  //       }

  //     }
  //     newEventArr.push(currObj);
  //   }
  //   return newEventArr;
  // },

  detectSlots: function(oldEventArr) {
    var newEventArr = [], n = oldEventArr.length;

    for (var i = 0; i < n; i+=1) {
      var currObj = oldEventArr[i];
      newEventArr.push({"start":currObj.start,"end":currObj.end,"slotIndex":undefined,"totalSlots":0});
    }

    var link = {};

    // create link lists and totals
    for (var i = 0; i < n; i+=1) {
      var currObj = newEventArr[i];
      if (!link.hasOwnProperty(""+i))
        link[""+i] = {};

      for (var j = i+1; j < n; j+=1) {
        var nextObj = newEventArr[j];
        var not_overlap = (currObj.end <= nextObj.start || nextObj.end <= currObj.start);
        if (!not_overlap) {
          currObj.totalSlots+=1;
          nextObj.totalSlots+=1;

          link[""+i][""+j] = 1;
          if (!link.hasOwnProperty(""+j))
            link[""+j] = {};
          link[""+j][""+i] = 1;
        }
      }
    }

    var arrities = [];
    for (var i = 0; i < n; i+=1) {
      arrities.push( {"arrity":newEventArr[i].totalSlots, "indx":i} );
    }

    // sort by arrities [a better solution is using a priority queue]
    for (var i = 0; i < n-1; i+=1) {
      var current_arrity = -1, indx = -1;
      for (var j = i; j < n; j+=1) {
        if (arrities[j].arrity > current_arrity) {
          indx = j;
          current_arrity = arrities[j].arrity;
        }
      }
      var temp = arrities[i];
      arrities[i] = arrities[indx];
      arrities[indx] = temp;
    }

    for (var i = 0; i < n; i+=1) {
      var nodeIndex = arrities[i].indx;
      // init used colors
      var colors = [];
      for (var j = 0; j < n; j+=1) {
        colors.push(0);
      }
      //find used colors on links
      for (var k in link[""+nodeIndex]) {
        var color = newEventArr[k].slotIndex;
        if (color || color === 0)
          colors[color] += 1;
      }
      //find the first unused color
      for (var j = 0; j < n; j+=1) {
        if (colors[j] <= 0) {
          // color the node
          newEventArr[nodeIndex].slotIndex = j;
          break;
        }
      }
    }
    return newEventArr;
  },

  render: function() {
    var calEvents = this.detectSlots( this.state.calEvents );

    for ( var i=0; i<calEvents.length; i++ ) {
      console.log( 'calEvents['+i+'] has a slot index of ' + calEvents[i].slotIndex + ' and total slots of ' + calEvents[i].totalSlots );
    }

    return (
      React.createElement("div", null, 
      calEvents.map(function(item, i){
          var top = item.start,
              width = 100.0 / item.totalSlots,
              left = width * item.slotIndex,
              height = item.end - item.start;

          return(React.createElement(Event, {key: i, top: item.start, width: 100.0/item.totalSlots, left: width*item.slotIndex, height: item.end-item.start}));
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
    var title      = "Sample Title",
        location   = "Sample Location"
        cssClass   = "event";

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