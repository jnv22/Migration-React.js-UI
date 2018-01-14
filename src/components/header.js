import components from "./mdlComponents"
import React, { Component } from "react"
import Api from "../api"

class Header extends Component {
  render() {
    return <components.Header {...this.props} title="Migration Track"/>
  }
}

export default Header;
