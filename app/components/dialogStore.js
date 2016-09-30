module.exports =  {
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
