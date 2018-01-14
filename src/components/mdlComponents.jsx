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
  AutoComplete: props => (
    <AutoComplete
      floatingLabelText="Type Location"
      onUpdateInput={props.updateLocation}
      filter={AutoComplete.fuzzyFilter}
      id={props.id}
      dataSource={props.location}
      maxSearchResults={10}
      onNewRequest={props.locationSelected}
    />
  ),

  Header: props => (<AppBar
    title={props.title}
    iconElementLeft={
      <IconButton
        onTouchTap={props.toggleModal.bind(null, 'Add')}
      ><AddNewBird />
      </IconButton>
      }
    iconElementRight={props.signedIn ?
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
          }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Profile" onTouchTap={props.toggleModal.bind(null, 'Profile')} />
        <MenuItem primaryText="About" onTouchTap={props.toggleModal.bind(null, 'About')} />
      </IconMenu> :
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
          }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem primaryText="Sign in" href={`${process.env.REACT_APP_URL_ROOT}/api/auth/facebook`} />
        <MenuItem primaryText="About" onTouchTap={props.toggleModal.bind(null, 'About')} />
      </IconMenu>
      }
  />),

  Dialog: props => (
    <div>
      <Dialog
        title={props.currentDialog}
        actions={props.actions}
        modal={false}
        contentClassName="modal"
        open={props.open}
        onRequestClose={props.toggle}
      >
        {props.children}
      </Dialog>
    </div>
  ),

  Drawer: props => (
    <Drawer open={props.open} className="drawer">
      <AppBar iconElementLeft={<IconButton />} />
      {props.currentView}
    </Drawer>
  ),

  DatePicker: (props) => {
    const maxDate = new Date();
    return (
      <DatePicker
        hintText="Select Date"
        maxDate={maxDate}
        autoOk
        onChange={props.onChange}
      />
    );
  },

  InputField: props => (
    <TextField
      type={props.type}
      id={props.id}
      onChange={props.handleChange}
      floatingLabelText={props.label}
    />
  ),
};
export default Components;
