import React from 'react';
import RouteName from './utils/RouteName';
import {Switch, Route, Redirect} from "react-router-dom";
import Dashboard from './layouts/Dashboard/Dashboard';
import Auth from './layouts/Auth/Auth';
import {useSelector} from 'react-redux'

const Main = props => {
  // 在此处进行如下定义，可以保证只要没有登录，就无法看到Dashboard界面
  let isLogin = useSelector(state => state.session.loggedIn)
  let redictPage = <Redirect to={RouteName.AUTHENTIC_PAGE} />
  if(isLogin)
    redictPage = <Redirect to={RouteName.MAIN_PAGE} />
  return (
      <div>
        <Switch>
          <Route path={RouteName.AUTHENTIC_PAGE}><Auth/></Route>
          <Route path={RouteName.MAIN_PAGE}><Dashboard/></Route>
        </Switch>
        {redictPage}
      </div>
  );
}

export default Main;
