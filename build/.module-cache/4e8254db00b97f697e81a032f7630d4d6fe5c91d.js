var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        "Hello world! I am a comment box. wee!"
      )
    )
  }
});

React.render(React.createElement(CommentBox, null), document.getElementById('calendar'));