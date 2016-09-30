import React from "react"
import components from "./mdlComponents"
import FlatButton from 'material-ui/FlatButton';


module.exports = React.createClass({
  render: function() {
    // In-place hack for React material design, AutoComplete, 'datasource'.  Unfortunately,
    // this component requires data to be in an array.  We need to have an object, for us to reference the
    // db_id.  So we must first turn all results returned from the db into an array, then after selecting our choice,
    // we take the index of that item and check it against the index of the data from our db.
    // According to issue #2735, this will be fixed sometime in the near future
    var location = [];
    var locations = this.props.locations
    var selectedLocation = this.props.setLocation

    locations.map(function(locale) {
      location.push(locale.city + " " + locale.state + " " + locale.zipcode)
    })
    var locationSelected = ((data, index) => {
      this.props.setLocation.call(null, this.props.locations[index]._id)
    })
    return (
      <div>
        <h1 className="title">Add Bird</h1>
        <form  ref="addBirdForm" onSubmit={this.props.saveBird}>
          <span className="formComponents"><components.AutoComplete {...this.props} id="setBirdLocation" location={location} locationSelected={locationSelected}/></span>
          <span className="formComponents"><components.InputField {...this.props} id="setBirdSpecies" label="Bird Species" type="text"/></span>
          <span className="formComponents"><components.InputField {...this.props} id="setBirdQty" label="Qty" type="number"/></span>
          <span className="formComponents"><components.DatePicker onChange={this.props.setDate}  defaultDate={Date.now()} /></span>
        </form>
      </div>
    )
  }
})
