import React, {Suspense} from 'react';
import RouteName from './utils/RouteName';
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from './layouts/Dashboard/Dashboard';
import Auth from './layouts/Auth/Auth';
import {useSelector} from 'react-redux'

const Main = props => {
  let isLogin = useSelector(state => state.session.loggedIn)
  let redictPage = <Redirect to={RouteName.AUTHENTIC_PAGE} />
  if(isLogin)
    redictPage = <Redirect to={RouteName.MAIN_PAGE} />
  
  return (
      <div className="App">
        <Switch>
          <Route path={RouteName.AUTHENTIC_PAGE}><Auth/></Route>
          <Route path={RouteName.MAIN_PAGE}><Dashboard/></Route>
        </Switch>
        {redictPage}
      </div>
  );
}

export default Main;
