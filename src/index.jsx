import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import DisclosurePage from './containers/DisclosurePage';
import MOOCPilotAppPage from './containers/MOOCPilotAppPage';


import history from './data/history';
import store from './data/store';

import './App.scss';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <header>
          <nav>
            <ul className="nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/public/disclosure">Disclosure</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/public/disclosure" component={DisclosurePage} />
            <Route path="/public/hello" component={() => <span>Hello World, open route</span>} />
            <Route
              path="/"
              component={MOOCPilotAppPage}
            />
          </Switch>
        </main>
      </div>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
