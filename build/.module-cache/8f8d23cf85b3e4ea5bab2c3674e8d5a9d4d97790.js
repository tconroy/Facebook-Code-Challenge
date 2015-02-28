var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}],
    TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];

// =============

var Calendar = React.createClass({displayName: "Calendar",
  render: function() {
    console.dir( this.prop.times );
    var times = this.prop.times;
    var calEvents = this.prop.calEvents;
    return (
      React.createElement("div", null, 
        React.createElement(Timeline, {times: times}), 
        calEvents.map(function(calEvent, i){
          return React.createElement(Event, {start: calEvent.start, key: i, end: calEvent.end});
        })
      )
    );
  }
});

// =============

var Event = React.createClass({displayName: "Event",
  render: function() {
    var title = "Sample Title";
    var location = "Sample Location";
    return (
      React.createElement("div", {className: "event"}, 
        React.createElement("dt", null, title), 
        React.createElement("dd", null, location)
      )
    );
    //return (<div key={this.prop.key}, className='events'>{this.prop.start}, {this.prop.end}</div>);
  }
});

// =============

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

// =============
  React.render( React.createElement(Calendar, {calEvents: SAMPLE_EVENTS, times: TIME_OPTS}), document.getElementById('calendar'));
