// =============

var Calendar = React.createClass({displayName: "Calendar",
  getInitialState: function() {
    return { calEvents: SAMPLE_EVENTS };
  },
  render: function() {
    // var times = this.prop.times;
    // var calEvents = this.prop.calEvents;
    //
    // return (
    //   <div>
    //     <Timeline times={this.prop.times} />
    //     {this.prop.calEvents.map(function(item, i){
    //       return <Event start={item.start} key={i} end={item.end} />;
    //     })}
    //   </div>
    // );

    var times = this.props.times;
    var calEvents = this.state.calEvents;
    return (
      React.createElement("div", null, 
      React.createElement(Timeline, {times: times}), 
      calEvents.map(function(item){
          return( React.createElement(Event, {start: item.start, end: item.end}) );
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
  }
});

// =============

var Timeline = React.createClass({displayName: "Timeline",

  render: function() {
    var times = this.props.times;
    return(
      React.createElement("ol", {className: "timeline"}, 
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
var SAMPLE_EVENTS = [{start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670}];
var TIME_OPTS = [9,10,11,12,13,14,15,16,17,18,19,20,21];
  React.render( React.createElement(Calendar, {calEvents: SAMPLE_EVENTS, times: TIME_OPTS}), document.getElementById('calendar'));
