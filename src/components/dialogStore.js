import React, { Component } from "react"


const dialogStore =  {
  Profile: function() {
    var profile = this.props.user.profile
    var email = profile.email !== null ? <li><b>Email:</b> {profile.email}</li> : ""

    return ([
      <h1 className="title">Profile</h1>,
      <img className="profilePicture" src={profile.picture} />,
      <ul className="profileInformation">
        <li><b>Name:</b> {profile.fullName}</li>
        {email}
      </ul>
    ])
  },
  About: function() {
    return ([
      <h1 className="title">Welcome to Migration Track!</h1>,
      <p>This application was launched for the purpose of tracking birds during their seasonal migrations </p>,
      <p>You have the option of signing in to keep track of your entries for later review </p>,
      <p>To add a new entry, press the '+' button in the upper-left hand side of the page and select the location,
         bird species, quantity and date that you made your observation</p>,
      <b>If you have any questions, please feel free to email me at <a href="hi@jordanvartanian.com">hi@jordanvartanian.com</a> and I will get right back to you </b>
    ])
  },
  SignOut: function() {
    return <h1 className="title">Successfully Logged Out!</h1>
  }
}

export default dialogStore;
