import React from "react"
import components from "../components/mdlComponents"
import api from "../api"
import moment from "moment"
import env from "../env"
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


var MapDisplay = React.createClass({
  render: function() {

    //set to center of USA
    const position = [39.8282, -98.5795];
    return (
      <Map center={position} zoom={4}>
      <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {this.props.birds.map(function(bird) {
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

var Header = React.createClass({
  render: function() {
    return <components.Header  {...this.props}/>
  }
})

module.exports = React.createClass({
  getInitialState: function() {
      return {
        birds: [],
        isSignedIn: '',
        open: false,
        currentModalView: ''
      }
  },

  componentDidMount: function() {
    api.birds()
      .then((totalBirds) => {
        this.setState({
          birds: totalBirds.data.result
        })
      })
    api.checkUserLoggedIn()
      .then((user) => {
        this.setState({
          isSignedIn: true
        })
      })
      .catch((err) => {
        this.setState({
          isSignedIn: false
        })
      })
  },

  openModal: function() {
    this.setState({
      open: true
    })
  },

  closeModal: function() {
    this.setState({
      open: false
    });
  },

  render: function() {
    let signInURL = env.URL_ROOT + '/auth/facebook'
    return (
      <div className="content">
        <Header title="Migration" signIn={signInURL} isSignedIn={this.state.isSignedIn} openModal={this.openModal}/>
        <components.Dialog  handleClose={this.closeModal} open={this.state.open}/>
        <MapDisplay birds={this.state.birds}/>
      </div>
    )
  }
});
