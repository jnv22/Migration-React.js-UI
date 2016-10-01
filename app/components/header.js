import components from "./mdlComponents"
import React from "react"
import Api from "../api"

var Header = React.createClass({
  render: function() {
    return <components.Header {...this.props} title="Migration Track"/>
  }
})

module.exports = Header;
