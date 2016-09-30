import React from "react";
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from './views/main'

injectTapEventPlugin();
require('./styles/app.scss')
require('./styles/media-query.scss')

import { Router, Route, browserHistory} from 'react-router';

if (typeof window !== 'undefined') window.React = React

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
       <Route path="/loginSuccess" component={Main}/>
     </Route>
     <Route path="*" component={NoMatch}/>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
