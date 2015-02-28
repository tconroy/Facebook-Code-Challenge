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