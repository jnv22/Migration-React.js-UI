import React, { Component } from "react"
import api from "../api"
import env from "../env"
import Map from "./map"
import components from "../components/mdlComponents"
import Header from "../components/header"
import Dialog from "../components/dialog"

import styles from '../styles/app.css'

class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  componentDidMount() {
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
  }

  toggleModal = (modal) => {
    modal === 'SignOut' ? this.signOut() : ""

    this.setState({
      modalOpen: !this.state.modalOpen,
      currentModalView: modal,
      setBirdLocation: '',
      setBirdSpecies: '',
      setBirdQty: undefined,
      setBirdDate: ''
    })
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  updateLocation = (location) => {
    api.getLocation(location)
      .then((city) => {
        this.setState({
          locations: city.data.result
        })
      })
  }

  setLocation = (location) => {
    this.setState({
      setBirdLocation: location
    })
  }

  setDate = (e, date) => {
    var ts = new Date(date).getTime()
    this.setState({
      setBirdDate: ts
    })
  }

  saveBird = (e) => {
    e.preventDefault()
    api.saveBird({
      ts: this.state.setBirdDate,
      species: this.state.setBirdSpecies,
      quantity: +this.state.setBirdQty,
      location: this.state.setBirdLocation
    }).then((birds) => {
      this.toggleModal()
      this.setState({
        birds: [...this.state.birds, ...[birds.data.result.bird]],
        userBirds: Object.keys(birds.data.result.user).length > 0 ? [...this.state.userBirds, ...[birds.data.result.user]] : [],
        setLocation: '',
        setBirdSpecies: '',
        setBirdQty: ''
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  signOut = () => {
    api.signOut()
      .then(() => {
        this.setState({
          signedIn: false,
          userBirds: [],
          user: {}
        })
      })
  }

  render() {
    let signInURL = env.URL_ROOT + '/api/auth/facebook'
    return (
      <div className={styles.content}>
        <Header
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
          setBirdDate={this.state.setBirdDate}
          setBirdLocation={this.state.setBirdLocation}
          setLocation={this.setLocation}
          setDate={this.setDate}
          saveBird={this.saveBird}
        />
        <Map birds={this.state.birds} userBirds={this.state.userBirds}/>
      </div>
    )
  }
};

export default main;