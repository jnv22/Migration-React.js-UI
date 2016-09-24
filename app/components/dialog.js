import React from "react"
import components from "./mdlComponents"

function DialogTemplate(currentView, location, locationSelected) {
  switch(currentView) {
    case 'Profile':
      var profile = this.props.user.profile
      return ([
        <h1 className="title">Profile</h1>,
        <img className="profilePicture" src={profile.picture} />,
        <ul className="profileInformation">
          <li><b>Name:</b> {profile.fullName}</li>
          <li><b>Email:</b> {profile.email}</li>
        </ul>
      ])

    case 'About':
      return ([
        <h1 className="title">Welcome to Project Migration!</h1>,
        <p>This is going to be such an awesome app!</p>
      ])

    case 'Add':
      return([
        <h1 className="title">Add Bird</h1>,
        <components.AutoComplete {...this.props} location={location} locationSelected={locationSelected}/>
      ])

    default:
      return ''
  }
}

function DialogSetup(currentView) {
  // In-place hack for React material design, AutoComplete, 'datasource'.  Unfortunately,
  // this component requires data to be in an array.  We need to have an object, for us to reference the
  // db_id.  According to issue #2735, this will be fixed sometime in the near future

  var location = [];

  this.props.locations.map(function(locale) {
    location.push(locale.city + " " + locale.state + " " + locale.zipcode)
  })
  var locationSelected = ((data, index) => {
    console.log(data, index, location, this.props.locations[index])
  })

  return DialogTemplate.call(this, this.props.currentView, location, locationSelected)
}

var Dialog = React.createClass({
  render: function() {
    var currentView = DialogSetup.call(this)
    return <components.Dialog {...this.props} currentView={currentView}/>
  }
})

module.exports = Dialog
