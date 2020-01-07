import React from 'react';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from './components';
import store from './store';

import '../resources/scss/style.scss';


ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);