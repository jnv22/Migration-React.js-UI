import React from "react"
import components from "./mdlComponents"


function DialogTemplate(currentView) {
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

    default:
      return ''
  }
}

var Dialog = React.createClass({
  render: function() {
    var currentView = DialogTemplate.call(this, this.props.currentView)
    return <components.Dialog {...this.props} currentView={currentView}/>
  }
})

module.exports = Dialog
