import React from 'react';
import theme from './theme';
import RouteName from './RouteName';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Dashboard from './layouts/Dashboard/Dashboard';
import Auth from './layouts/Auth/Auth';
import Error from './layouts/Error/Error';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { configureStore } from './store';


const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <header className="App-header">
              <ul>
                <li><Link to={RouteName.MAIN_PAGE}>Dashboard</Link></li>
                <li><Link to={RouteName.AUTHENTIC_PAGE}>Authentic Page</Link></li>
                <li><Link to={RouteName.ERROR_PAGE}>Error Page</Link></li>
              </ul>
              <Switch>
                <Route path={RouteName.MAIN_PAGE}><Dashboard/></Route>
                <Route path={RouteName.AUTHENTIC_PAGE}><Auth/></Route>
                <Route path={RouteName.ERROR_PAGE}><Error/></Route>
              </Switch>
            </header>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
