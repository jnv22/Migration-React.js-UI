import React from "react"
import api from "../api"
import env from "../env"
import Map from "./map"
import components from "../components/mdlComponents"
import Header from "../components/header"
import Dialog from "../components/dialog"
import Drawer from "../components/drawer"


module.exports = React.createClass({
  getInitialState: function() {
      return {
        birds: [],
        signedIn: false,
        user: {},
        modalOpen: false,
        drawerOpen: false,
        currentModalView: '',
        locations: [],
        setBirdLocation: '',
        setBirdSpecies: '',
        setBirdQty: ''
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
              user: user.data.result
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

  saveBird: function(e) {
    e.preventDefault()
    api.saveBird({
      ts: Date.now(),
      species: this.state.setBirdSpecies,
      quantity: +this.state.setBirdQty,
      location: this.state.setBirdLocation
    }).then((bird) => {
      var birdModel = this.state.birds
      this.setState({
        birds: this.state.birds.concat([bird.data.result]),
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

  render: function() {
    console.log(this.state.birds)
    let signInURL = env.URL_ROOT + '/auth/facebook'
    var displayMap = Map(this.state.birds)
    return (
      <div className="content">
        <Header
          title="Migration"
          signInURL={signInURL}
          signedIn={this.state.signedIn}
          toggleModal={this.toggleModal}
          toggleDrawer={this.toggleDrawer}
         />
        <Dialog
          toggle={this.toggleModal}
          currentView={this.state.currentModalView}
          user={this.state.user}
          open={this.state.modalOpen}
        />
        <Drawer
          toggle={this.toggleDrawer}
          updateLocation={this.updateLocation}
          handleChange={this.handleChange}
          locations={this.state.locations}
          setBirdSpecies={this.state.setBirdSpecies}
          setBirdQty={this.state.setBirdQty}
          setBirdLocation={this.state.setBirdLocation}
          setLocation={this.setLocation}
          open={this.state.drawerOpen}
          saveBird={this.saveBird}
        />
        {displayMap}
      </div>
    )
  }
});
