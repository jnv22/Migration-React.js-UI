import React from "react"
import components from "../components/mdlComponents"
import api from "../api"
import moment from "moment"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

var classNames = require('classnames');

var MapDisplay = React.createClass({
  getInitialState: function() {
      return {
        birds: []
      }
  },

  componentDidMount: function() {
    api.birds()
      .then((totalBirds) => {
          this.setState({
            birds: totalBirds.data.result
          })
      })
  },

  render: function() {
    var birds = this.state.birds

    //set to center of USA
    const position = [39.8282, -98.5795];

    return (
      <Map center={position} zoom={4}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {birds.map(function(bird) {
        return <Marker key={bird._id} position={[bird.location.lat, bird.location.lng]}>
        <Popup>
          <span>
            <b>Species: </b>{bird.species}<br/>
            <b>Quantity: </b>{bird.quantity}<br/>
            <b>Time: </b>{moment(bird.ts).format("dddd, MMMM Do YYYY, h:mm a")}<br/>
          </span>
        </Popup>
      </Marker>
      })}
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
