import React from "react"
import components from "./mdlComponents"
import FlatButton from 'material-ui/FlatButton';

var TemplateStore = {
  Add: function(location, locationSelected) {
    return ([
      <h1 className="title">Add Bird</h1>,
      <form ref="addBirdForm" onSubmit={this.props.saveBird}>
        <span className="formComponents"><components.AutoComplete {...this.props} id="setBirdLocation" location={location} locationSelected={locationSelected}/></span>
        <span className="formComponents"><components.InputField {...this.props} id="setBirdSpecies" label="Bird Species" type="text"/></span>
        <span className="formComponents"><components.InputField {...this.props} id="setBirdQty" label="Qty" type="number"/></span>
        <span className="formComponents"><components.DatePicker onChange={this.props.setDate}  defaultDate={Date.now()} /></span>
        </form>
    ])
  },
  Profile: function() {
    var profile = this.props.user.profile
    return ([
      <h1 className="title">Profile</h1>,
      <img className="profilePicture" src={profile.picture} />,
      <ul className="profileInformation">
        <li><b>Name:</b> {profile.fullName}</li>
        <li><b>Email:</b> {profile.email}</li>
      </ul>
    ])
  },
  About: function() {
    return ([
      <h1 className="title">Welcome to Project Migration!</h1>,
      <p>This application was launched witht he purpose of allowing users to </p>
    ])
  }
}

var Dialog = React.createClass({
  render: function() {
    var actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggle}
      />,
      <FlatButton
        label="ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.toggle}
      />,
    ]


    function LocationSetup(locations, selectedLocation) {
      // In-place hack for React material design, AutoComplete, 'datasource'.  Unfortunately,
      // this component requires data to be in an array.  We need to have an object, for us to reference the
      // db_id.  So we must first turn all results returned from the db into an array, then after selecting our choice,
      // we take the index of that item and check it against the index of the data from our db.
      // According to issue #2735, this will be fixed sometime in the near future
      var location = [];
      locations.map(function(locale) {
        location.push(locale.city + " " + locale.state + " " + locale.zipcode)
      })
      var locationSelected = ((data, index) => {
        this.props.setLocation.call(null, this.props.locations[index]._id)
      })

      return TemplateStore.Add.call(this, location, locationSelected)
    }

    function DialogTemplate() {
      var currentView = this.props.currentView
      switch(currentView) {
        case 'Add':
          var locations = this.props.locations
          var selectedLocation = this.props.setLocation
            actions = [
              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.toggle}
              />,
              <FlatButton
                label="Save"
                primary={true}
                type="submit"
                disabled={this.props.setBirdLocation.length === 0|| this.props.setBirdSpecies.length == 0 || this.props.setBirdQty == 0 }
                keyboardFocused={true}
                onTouchTap={this.props.saveBird}
              />
            ]
          return LocationSetup.call(this, locations, selectedLocation)
        case 'Profile':
          return TemplateStore.Profile.call(this)
        case 'About':
          return TemplateStore.About.call(this)
        default:
          return ''
      }
    }

    var currentView = DialogTemplate.call(this)
    return <components.Dialog {...this.props} actions={actions} currentView={currentView}/>
  }
})

module.exports = Dialog
