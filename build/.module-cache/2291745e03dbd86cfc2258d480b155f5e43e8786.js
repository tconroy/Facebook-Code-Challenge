/** =============
 * Calendar class. Formats raw event Data into Event Objects, rendering them onto
 * the display. Owns Instances of Timeline and Event Classes.
 */
var Calendar = React.createClass({displayName: "Calendar",
  getInitialState: function() {
    return { calEvents: SAMPLE_EVENTS };
  },

  eventSorter: function(event1, event2) {
    if ( event1.start > event2.start ) {
      return 1;
    } else if (event1.start < event2.start) {
      return -1;
    } else {
      return 0;
    }
  },

  eventsOverlap: function(event1, event2) {
    return event1.start < event2.end && event2.start < event1.end;
  },

  formatSlots: function(events) {
    var that = this;  // save Object scope to var for reference
    var slots = [[]]; // multidimensional array to track slots. each contains Event objects.
    var slotIndex, slot, slotEventIndex, slotEvent;

    // sort events chronologically
    events.sort(this.eventSorter);

    // Iterate through all the events to put them into slots
    var event;
    for (var eventIndex = 0; eventIndex < events.length; eventIndex++) {
      event = events[eventIndex];

      // Iterate through the slots to see which slot we can fit this event into
      var eventAddedToSlot = false;
      for (slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        slot = slots[slotIndex];

        // Iterate through all the events in this slot to see if we can fit the event into this slot
        for (slotEventIndex = 0; slotEventIndex < slot.length; slotEventIndex++) {
          slotEvent = slot[slotEventIndex];

          if (that.eventsOverlap(event, slotEvent)) {
            // Events overlap, so event cannot go in this slot
            break;
          }

          if (event.end <= slotEvent.start) {
            // Event should go before slotEvent
            slot.splice(slotEventIndex, 0, event);
            event.slotIndex = slotIndex;
            eventAddedToSlot = true;
            break;
          }
        }

        if (eventAddedToSlot) {
          // Event has been added to slot, so no need to look at other slots
          break;
        } else {
          // Check if event can be added to the end of the slot
          if (slot.length === 0 || event.start >= slot[slot.length - 1].end) {
            slot.push(event);
            event.slotIndex = slotIndex;
            eventAddedToSlot = true;
            break;
          }
        }
      }

      if (!eventAddedToSlot) {
        // Event couldn't be added to current slots, so create a new slot for it
        event.slotIndex = slots.length;
        slots.push([event]);
      }
    }

    // Iterate through each event to set the total slots
    for (eventIndex = 0; eventIndex < events.length; eventIndex++) {
      event = events[eventIndex];
      event.totalSlots = 0;

      // Iterate through each slot and see how many slots this event overlaps with
      for (slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        slot = slots[slotIndex];

        for (slotEventIndex = 0; slotEventIndex < slot.length; slotEventIndex++) {
          slotEvent = slot[slotEventIndex];

          if (that.eventsOverlap(event, slotEvent)) {
            event.totalSlots++;
            break;
          }
          if (event.end <= slotEvent.start) {
            break;
          }
        }
      }
    }
    return events;
  },
  render: function() {
    var calEvents = this.formatSlots( this.state.calEvents );
    // return (
    //   <div>
    //   {calEvents.map(function(item, i){
    //     var width  = 100.0/item.totalSlots,
    //         left   = width * item.slotIndex,
    //         top    = item.start,
    //         height = item.end - item.start;
    //     return(<Event key={i} top={top} width={width} left={left} height={height} />);
    //   })}
    //   </div>
    // );

    var output;
    // calEvents.map(function( item, i ) {
    //   var width  = 100.0/item.totalSlots,
    //         left   = width * item.slotIndex,
    //         top    = item.start,
    //         height = item.end - item.start;
    //   output.push(<Event key={i} top={top} width={width} left={left} height={height} />);
    // });

    var output = [];
    for ( var i=0; i<calEvents.length; i++ ) {
      var width  = 100.0/calEvents[i].totalSlots,
            left   = width * calEvents[i].slotIndex,
            top    = calEvents[i].start,
            height = calEvents[i].end - calEvents[i].start;
      output.push(React.createElement(Event, {key: i, top: top, width: width, left: left, height: height}));
    }
    console.dir(output);
    return output;

    // return (
    //   <div>
    //   {calEvents.map(function(item, i){
    //     var width  = 100.0/item.totalSlots,
    //         left   = width * item.slotIndex,
    //         top    = item.start,
    //         height = item.end - item.start;
    //     return(<Event key={i} top={top} width={width} left={left} height={height} />);
    //   })}
    //   </div>
    // );
  }
});

/** =============
 * Creates a single HTML entity to represent an event inside the Calendar class.
 */
var Event = React.createClass({displayName: "Event",
  render: function() {
    var title      = "Sample Title",
        location   = "Sample Location"
        cssClass   = "event";

    var eventStyle = {
      top:    this.props.top,
      left:   this.props.left + '%',
      height: this.props.height,
      width:  this.props.width + '%'
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