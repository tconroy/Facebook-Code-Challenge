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

  eventsOverlap: function(event1, event2) {
    return event1.start < event2.end && event2.start < event1.end;
  },

  formatSlots: function(events) {
    var that = this;

    // Sort events by start time
    events.sort(function(event1, event2) {
      if (event1.start > event2.start) {
        return 1;
      } else if (event1.start < event2.start) {
        return -1;
      } else {
        return 0;
      }
    });

    // An array that contains arrays which represent slots
    // Each slot array contains events
    var slots = [[]];
    var slotIndex, slot, slotEventIndex, slotEvent;

    // Iterate through all the events to put them into slots
    var event;
    for (var event_index = 0; event_index < events.length; event_index++) {
      event = events[event_index];

      // Iterate through the slots to see which slot we can fit this event into
      var event_added_to_slot = false;
      for (slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        slot = slots[slotIndex];

        // Iterate through all the events in this slot to see if we can fit the event into this slot
        for (slot_event_index = 0; slot_event_index < slot.length; slot_event_index++) {
          slot_event = slot[slot_event_index];

          if (that.eventsOverlap(event, slot_event)) {
            // Events overlap, so event cannot go in this slot
            break;
          }

          if (event.end <= slot_event.start) {
            // Event should go before slot_event
            slot.splice(slot_event_index, 0, event);
            event.slotIndex = slotIndex;
            event_added_to_slot = true;
            break;
          }
        }

        if (event_added_to_slot) {
          // Event has been added to slot, so no need to look at other slots
          break;
        } else {
          // Check if event can be added to the end of the slot
          if (slot.length === 0 || event.start >= slot[slot.length - 1].end) {
            slot.push(event);
            event.slotIndex = slotIndex;
            event_added_to_slot = true;
            break;
          }
        }
      }

      if (!event_added_to_slot) {
        // Event couldn't be added to current slots, so create a new slot for it
        event.slotIndex = slots.length;
        slots.push([event]);
      }
    }

    // Iterate through each event to set the total slots
    for (event_index = 0; event_index < events.length; event_index++) {
      event = events[event_index];
      event.totalSlots = 0;

      // Iterate through each slot and see how many slots this event overlaps with
      for (slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        slot = slots[slotIndex];

        for (slot_event_index = 0; slot_event_index < slot.length; slot_event_index++) {
          slot_event = slot[slot_event_index];

          if (that.eventsOverlap(event, slot_event)) {
            event.totalSlots++;
            break;
          }

          if (event.end <= slot_event.start) {
            break;
          }
        }
      }
    }

    console.dir(events);
    return events;
  },


  render: function() {
    var calEvents = this.formatSlots( this.state.calEvents );

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