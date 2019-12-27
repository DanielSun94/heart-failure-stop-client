import React from 'react';
import RouteName from './utils/RouteName';
import {Switch, Route, Redirect} from "react-router-dom";
import MainPage from './layouts/MainPage/MainPage';
import Auth from './layouts/Auth/Auth';
import {useSelector} from 'react-redux'

const Main = () => {
  // 在此处进行如下定义，可以保证只要没有登录，就无法看到Dashboard界面
  let isLogin = useSelector(state => state.session.loggedIn);
  let redirectPage = <Redirect to={RouteName.AUTHENTIC_PAGE} />;
  if(isLogin)
      redirectPage = <Redirect to={RouteName.MAIN_PAGE} />;
  return (
      <div style={{height: "100%", width: "100%"}}>
        <Switch>
          <Route path={RouteName.AUTHENTIC_PAGE}><Auth/></Route>
          <Route path={RouteName.MAIN_PAGE}><MainPage/></Route>
        </Switch>
        {redirectPage}
      </div>
  );
};

export default Main;
