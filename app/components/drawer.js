import React from "react"
import components from "./mdlComponents"
import FlatButton from 'material-ui/FlatButton';

function DrawerTemplate(location, locationSelected) {
  console.log(this.props.setBirdLocation.length, this.props.setBirdSpecies.length, this.props.setBirdQty)
  return [
    <h1 className="title">Add Bird</h1>,
    <form ref="addBirdForm" onSubmit={this.props.saveBird}>
      <components.AutoComplete {...this.props} location={location} locationSelected={locationSelected}/>
      <components.InputField {...this.props} refs="setBirdSpecies" label="Bird Species" type="text"/>
      <components.InputField {...this.props} refs="setBirdQty" label="Qty" type="number"/>
      <components.DatePicker onChange={this.props.setDate} defaultDate={Date.now()} />
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.toggle}
      />

      <FlatButton
        label="Save"
        primary={true}
        type="submit"
        disabled={this.props.setBirdLocation.length === 0|| this.props.setBirdSpecies.length == 0 || this.props.setBirdQty == 0 }
        keyboardFocused={true}
        onTouchTap={this.props.toggle}
      />
    </form>
  ]
}


function DrawerSetup(currentView) {
  // In-place hack for React material design, AutoComplete, 'datasource'.  Unfortunately,
  // this component requires data to be in an array.  We need to have an object, for us to reference the
  // db_id.  According to issue #2735, this will be fixed sometime in the near future
  var location = [];

  this.props.locations.map(function(locale) {
    location.push(locale.city + " " + locale.state + " " + locale.zipcode)
  })
  var locationSelected = ((data, index) => {
    this.props.setLocation.call(null, this.props.locations[index]._id)
  })

  return DrawerTemplate.call(this, location, locationSelected)
}


var Drawer = React.createClass({
  render: function() {
    var currentView = DrawerSetup.call(this)
    return <components.Drawer {...this.props} currentView={currentView}/>
  }
})

module.exports = Drawer
