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
        signedIn: false,
        user: {},
        open: false,
        currentModalView: '',
        locations: [],
        selectedLocation: ''
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
        console.log("SIGNINED IN")
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

  updateLocation: function(location) {
    api.getLocation(location)
      .then((city) => {
        console.log(city.data.result)
        this.setState({
          locations: city.data.result
        })
      })
  },

  render: function() {
    let signInURL = env.URL_ROOT + '/auth/facebook'
    var displayMap = Map(this.state.birds)
    return (
      <div className="content">
        <Header
          title="Migration"
          signInURL={signInURL}
          signedIn={this.state.signedIn}
          openModal={this.openModal}
         />
        <Dialog
          updateLocation={this.updateLocation}
          locations={this.state.locations}
          currentView={this.state.currentModalView}
          user={this.state.user}
          handleClose={this.closeModal}
          open={this.state.open}
        />
        {displayMap}
      </div>
    )
  }
});
