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

var Dialog = React.createClass({
  render: function() {
    var fullName,email,img
    if (this.props.user.profile) {
      var user = this.props.user
      var fullName = user.profile.fullName
      var email = user.profile.email
      var img = user.profile.picture
    }

    var Index = {
      Profile: [
        <h1 className="title">Profile</h1>,
        <img className="profilePicture" src={img} />,
        <ul className="profileInformation">
          <li><b>Name:</b> {fullName}</li>
          <li><b>Email:</b> {email}</li>
        </ul>
      ],
      About: [
        <h1 className="title">Welcome to Project Migration!</h1>,
        <p>This is going to be such an awesome app!</p>
      ]
    }

    var currentView = Index[this.props.currentView]
    return <components.Dialog {...this.props} currentView={currentView}/>
  }
})

var Header = React.createClass({
  render: function() {
    console.log("HERE")
    var loggedInMenu = ["Profile", "About", "Sign Out"]
    return <components.Header {...this.props} loggedInMenu = {loggedInMenu} />
  }
})

module.exports = React.createClass({
  getInitialState: function() {
      return {
        birds: [],
        isSignedIn: false,
        user: {},
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
      .then(() => {
        this.setState({
          isSignedIn: true
        })
        api.getUser()
          .then((user) => {
            console.log(user.data.result, "HERE")
            this.setState({
              user: user.data.result
            })
          })
      })
      .catch((err) => {
        this.setState({
          isSignedIn: false
        })
      })
  },

  openModal: function(modal) {
    this.setState({
      open: true,
      currentModalView: modal
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
        <Dialog currentView={this.state.currentModalView} user={this.state.user} handleClose={this.closeModal} open={this.state.open}/>
        <MapDisplay birds={this.state.birds}/>
      </div>
    )
  }
});
