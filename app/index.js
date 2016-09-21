import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Admin from './admin';
import components from "./mdlComponents";

injectTapEventPlugin();
require('./styles/app.scss')
require ('./styles/font-awesome/css/font-awesome.css');

import { Router, Route, Link, browserHistory} from 'react-router';

const Main = React.createClass({
  getInitialState: function() {
    return {
      showCenterMenu: true,
      showTopMenu: false
    }
  },

  toggleMenuState: function(centerMenu, topMenu) {
    this.setState({
      showCenterMenu: showCenterMenu,
      showTopMenu: showTopMenu
    });
  },

  render: function() {
    return (
      <div className="MainSite">
        <h2>Main Page</h2>
      </div>
    )
  }
});

const NoMatch = React.createClass({
  render: function() {
    return (
      <h4>Error 404</h4>
    )
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
     <Route path="/" component={Main}>
       <Route path="admin" component={Admin}/>
     </Route>
     <Route path="*" component={NoMatch}/>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
