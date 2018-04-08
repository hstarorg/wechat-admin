import './less/all.less';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { routes } from './routes';

const initialState = {
  isLogged: false,
  user: {
    userName: ''
  }
};

const appContextReducer = function(state = initialState, action) {
  return state;
};

const store = createStore(appContextReducer, initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                render={props => <route.component {...props} routes={route.routes} />}
              />
            ))}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;