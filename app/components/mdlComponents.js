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




import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


import {Link, browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import Flight from 'material-ui/svg-icons/maps/flight';
import Library from 'material-ui/svg-icons/maps/local-library';
import Articles from 'material-ui/svg-icons/editor/insert-comment';
import Classifieds from 'material-ui/svg-icons/action/question-answer';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import moment from "moment";


const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  card: {
    height: 250,
    width: "100%",
    margin: 5,
    textAlign: 'center',
    display: 'inline-block'
  },
  paper: {
    height: 150,
    width: "90%",
    margin: "auto",
    textAlign: 'center',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
  root: {
  display: 'flex',
  width: "100%",
  flexWrap: 'wrap',
  justifyContent: 'space-around',

  },
  gridList: {
    width: "70%",
    minWidth: 690,
    height: 900,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const Components = {
  AutoComplete: React.createClass({
    render: function() {
      return (
        <AutoComplete
          floatingLabelText="Type Location"
          onUpdateInput={this.props.updateLocation}
          filter={AutoComplete.fuzzyFilter}
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
        onTouchTap={this.props.toggleDrawer.bind(null, "Add")}
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
          <MenuItem primaryText="Sign Out" onTouchTap={this.props.toggleModal.bind(null, "Sign Out")}/>
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
    const actions = [
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
    ];
    return (
      <div>
      <Dialog
        title={this.props.currentDialog}
        actions={actions}
        modal={false}
        contentClassName="modal"
        open={this.props.open}
        onRequestClose={this.props.toggle}
      >
          {this.props.currentView}
      </Dialog>
    </div>
    )
  }
}),

Drawer: React.createClass({

  render: function() {
    return (
        <Drawer open={this.props.open}>
          <AppBar />
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
          id={this.props.refs}
          onChange={this.props.handleChange}
          floatingLabelText={this.props.label}>
        </TextField>
      )
    }
  }),




  MediaTile: React.createClass({
    selectNewsArticle: function(tile) {
      window.open(tile.url)
    },
    render: function() {
      return (
        <GridTile
          onClick={this.selectNewsArticle.bind(this, this.props.tile)}
          title={this.props.tile.title}
          style={{margin: 10, cursor:"pointer"}}
        >
        <img src={this.props.tile.multimedia[3].url} />
        </GridTile>
      )
    }
  }),

  GridList: React.createClass({
    render: function() {
      var newsArticles = this.props.newsArticles;
      var renderArticles = newsArticles.map(function(tile, key) {
        return <Components.MediaTile key={key} tile={tile} />
      })

      return (
        <div style={styles.root}>
          <Subheader
            style={{"textAlign": "center",
              borderBottom: "solid 1px rgba(0, 0, 0, 0.541176)",
              display: "inline",
              width: 600,
              paddingLeft: 0}}
            > <span>News From Around the World-  </span>{moment(new Date()).format("dddd, MMMM Do YYYY")}</Subheader>
          <GridList
            cellHeight={200}
            style={styles.gridList}
          >
            {renderArticles}
          </GridList>
        </div>
      );
    }
  }),

  Card: React.createClass({
    render: function() {
      return (
      <Paper
        style={styles.paper}
        zDepth={2}
        children= {
          <div class="displayPicture"
            style={{height: "100%", width: "100%","background": 'url("../../app/assets/nyc.jpg") no-repeat',backgroundPosition:'center bottom', backgroundSize:'cover'}}
          >
          <h2>TaiwanConnection</h2>
          </div>
       }
        />
      )
    }
  }),

  Paper: React.createClass({
    render: function() {
      return (
        <Paper
          style={styles.paper}
          zDepth={2}
          children={this.props.children}
          />
      )
    }
  }),

  ButtonRaised: React.createClass({
    render: function() {
      return (
        <RaisedButton
          label= {this.props.label}
          className="button"
          labelPosition="before"
          secondary="true"
          disabled={this.props.disabled}
          onClick={this.props.onclick}
          style={styles.button}>
        </RaisedButton>
        )
    }
  })
}
export default Components;
