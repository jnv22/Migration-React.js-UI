import React from "react";
import components from "../components/mdlComponents";
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var classNames = require('classnames');

var MapDisplay = React.createClass({
  render: function() {
    const position = [35.00, -77.5];
    return (
      <Map center={position} zoom={13}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </Popup>
      </Marker>
    </Map>
    )
  }
})

var Menu = React.createClass({
  render: function() {
    return (
      <div id="searchBar">
      <components.AutoComplete onInput={this.toggleMenuState}/>
      </div>
    )
  }
})

module.exports = React.createClass({
  render: function() {
    return (
      <div className="content">
        <Menu />
        <MapDisplay />
      </div>
    )
  }
});
