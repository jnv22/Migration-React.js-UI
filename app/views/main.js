import React from "react"
import api from "../api"
import env from "../env"
import Map from "./map"
import components from "../components/mdlComponents"
import Header from "../components/header"
import Dialog from "../components/dialog"

module.exports = React.createClass({
  getInitialState: function() {
      return {
        birds: [],
        userBirds: [],
        signedIn: false,
        user: {},
        modalOpen: false,
        drawerOpen: false,
        currentModalView: '',
        locations: [],
        setBirdLocation: '',
        setBirdSpecies: '',
        setBirdQty: undefined,
        setBirdDate: ''
      }
  },

  componentDidMount: function() {
    api.birds()
      .then((bird) => {
        this.setState({
          birds: bird.data.result
        })
      })
    api.checkUserLoggedIn()
      .then(() => {
        this.setState({
          signedIn: true
        })
        api.getUser()
          .then((user) => {
            this.setState({
              user: user.data,
              userBirds: user.data.birds
            })
          })
      })
      .catch((err) => {
        this.setState({
          signedIn: false
        })
      })
  },

  toggleModal: function(modal) {
    this.setState({
      modalOpen: !this.state.modalOpen,
      currentModalView: modal
    })
  },

  toggleDrawer: function() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  },

  updateLocation: function(location) {
    api.getLocation(location)
      .then((city) => {
        this.setState({
          locations: city.data.result
        })
      })
  },

  setLocation: function(location) {
    this.setState({
      setBirdLocation: location
    })
  },

  setDate: function(e, date) {
    var ts = new Date(date).getTime()
    this.setState({
      setBirdDate: ts
    })
  },

  saveBird: function(e) {
    e.preventDefault()
    api.saveBird({
      ts: this.state.setBirdDate,
      species: this.state.setBirdSpecies,
      quantity: +this.state.setBirdQty,
      location: this.state.setBirdLocation
    }).then((birds) => {
      this.toggleModal()
      var birdModel = this.state.birds
      this.setState({
        birds: [...this.state.birds, ...[birds.data.result.bird]],
        userBirds: [...this.state.userBirds, ...[birds.data.result.user]],
        setLocation: '',
        setBirdSpecies: '',
        setBirdQty: ''
      })
    })
  },

  handleChange: function(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  },

  signOut: function() {
    api.signOut()
      .then(() => {
        this.setState({
          signedIn: false,
          userBirds: [],
          user: {}
        })
      })
  },

  render: function() {
    let signInURL = env.URL_ROOT + '/api/auth/facebook'
    return (
      <div className="content">
        <Header
          title="Migration"
          signInURL={signInURL}
          signedIn={this.state.signedIn}
          toggleModal={this.toggleModal}
          toggleDrawer={this.toggleDrawer}
          signOut={this.signOut}
         />
        <Dialog
          toggle={this.toggleModal}
          currentView={this.state.currentModalView}
          user={this.state.user}
          open={this.state.modalOpen}
          updateLocation={this.updateLocation}
          handleChange={this.handleChange}
          locations={this.state.locations}
          setBirdSpecies={this.state.setBirdSpecies}
          setBirdQty={this.state.setBirdQty}
          setBirdLocation={this.state.setBirdLocation}
          setLocation={this.setLocation}
          setDate={this.setDate}
          saveBird={this.saveBird}
        />
        <Map birds={this.state.birds} userBirds={this.state.userBirds}/>
      </div>
    )
  }
});
