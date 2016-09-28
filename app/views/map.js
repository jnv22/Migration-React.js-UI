import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React from "react"
import moment from "moment"


module.exports = function(birds) {
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
          <b>Time: </b>{moment(bird.ts).format("dddd, MMMM Do YYYY")}<br/>
        </span>
      </Popup>
    </Marker>
    })}
  </Map>
  )
}
