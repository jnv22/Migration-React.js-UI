import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddNewBird from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Drawer from 'material-ui/Drawer';



const Components = {
  AutoComplete: React.createClass({
    render: function() {
      return (
        <AutoComplete
          floatingLabelText="Type Location"
          onUpdateInput={this.props.updateLocation}
          filter={AutoComplete.fuzzyFilter}
          id={this.props.id}
          dataSource={this.props.location}
          maxSearchResults={10}
          onNewRequest={this.props.locationSelected}
        />
      )
    }
  }),

Header: React.createClass({
  render: function() {
    return <AppBar
      title={this.props.title}
      iconElementLeft={
        <IconButton
        onTouchTap={this.props.toggleModal.bind(null, "Add")}
        ><AddNewBird /></IconButton>
      }
      iconElementRight={this.props.signedIn ?
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Profile" onTouchTap={this.props.toggleModal.bind(null, "Profile")}/>
          <MenuItem primaryText="About" onTouchTap={this.props.toggleModal.bind(null, "About")}/>
        </IconMenu> :
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Sign in" href={this.props.signInURL} />
          <MenuItem primaryText="About" onTouchTap={this.props.toggleModal.bind(null, "About")}/>
        </IconMenu>
      }
    />
  }
}),

Dialog: React.createClass({
  render: function() {
    return (
      <div>
      <Dialog
        title={this.props.currentDialog}
        actions={this.props.actions}
        modal={false}
        contentClassName="modal"
        open={this.props.open}
        onRequestClose={this.props.toggle}
      >
          {this.props.children}
      </Dialog>
    </div>
    )
  }
}),

Drawer: React.createClass({
  render: function() {
    return (
        <Drawer open={this.props.open} className="drawer">
          <AppBar iconElementLeft={<IconButton></IconButton>}/>
          {this.props.currentView}
        </Drawer>
    );
  }
}),

DatePicker: React.createClass({
  render: function() {
    const maxDate = new Date();
    return (
      <DatePicker
        hintText="Select Date"
        maxDate={maxDate}
        autoOk={true}
        onChange={this.props.onChange}/>
    )
  }
  }),

  InputField: React.createClass({
    render: function() {
      return (
        <TextField
          type={this.props.type}
          id={this.props.id}
          onChange={this.props.handleChange}
          floatingLabelText={this.props.label}>
        </TextField>
      )
    }
  })
}
export default Components;
