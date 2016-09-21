import React from 'react';

import AutoComplete from 'material-ui/AutoComplete';





import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


import {Link, browserHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
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

const fruit = [
  'Apple', 'Apricot', 'Avocado',
  'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
  'Boysenberry', 'Blood Orange',
  'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
  'Coconut', 'Cranberry', 'Clementine',
  'Damson', 'Date', 'Dragonfruit', 'Durian',
  'Elderberry',
  'Feijoa', 'Fig',
  'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
  'Honeydew', 'Huckleberry',
  'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
  'Kiwi fruit', 'Kumquat',
  'Lemon', 'Lime', 'Loquat', 'Lychee',
  'Nectarine',
  'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
  'Olive', 'Orange',
  'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
  'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
  'Quince',
  'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
  'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
  'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

const Components = {
  AutoComplete: React.createClass({
    render: function() {
      return (
        <AutoComplete
          floatingLabelText="Type Location"
          filter={AutoComplete.fuzzyFilter}
          dataSource={fruit}
          maxSearchResults={5}
        />
      )
    }
  }),

  MediaTile: React.createClass({
    selectNewsArticle: function(tile) {
      window.open(tile.url)
    },
    render: function() {
      console.log(this.props.tile.multimedia.length)
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

  Drawer: React.createClass({
    menuViews: [
      {title: "Home", img:"home", destination: "en-us"},
      {title: "Airfare Lookup", img:"plane", destination: "book-a-flight"},
      {title: "Learn Chinese", img:"book", destination: "learn"},
      {title: "Articles", img:"commenting", destination: "err"},
      {title: "Classifieds", img:"newspaper-o", clickEvent: "err"}
    ],

    onClick: function(destination) {
      browserHistory.push(destination)
    },

    render: function() {
      var menuItems =  this.menuViews.map((item) => {
        console.log(this.props.showMenu, "menu showing")
        var img = "fa fa-" + item.img;
        var destination = item.destination
        return (
          <MenuItem primaryText={item.title} onTouchTap={this.onClick.bind(this, item.destination)} leftIcon={<FontIcon className={img} checked="true"></FontIcon>} />
        )
      });
      return (
          <Drawer open={this.props.showMenu}>
            <AppBar onLeftIconButtonTouchTap={this.props.onClick}/>
            {menuItems}
          </Drawer>
      );
    }
  }),

  Header: React.createClass({
    render: function() {
      return (
      <div>
        <div id="header" className={this.props.showMenu ? "hide" : ""}>
          <AppBar
            title={this.props.title}
            onLeftIconButtonTouchTap={this.props.toggleMenuState}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
        </div>
      </div>
      )
    }
  }),

  DatePicker: React.createClass({
    render: function() {
      return (
        <DatePicker
          defaultDate={this.props.date}
          onChange={this.props.onChange}/>
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
  }),

  InputField: React.createClass({
    render: function() {
      return (
        <TextField
          hintText=""
          id={this.props.id}
          onChange={this.props.onChange}
          floatingLabelText={this.props.label}>
        </TextField>
      )
    }
  })
}
export default Components;
