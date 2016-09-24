import components from "./mdlComponents"
import React from "react"


var Header = React.createClass({
  render: function() {
    return <components.Header {...this.props}  />
  }
})

module.exports = Header;
