import React, {Fragment} from 'react';
import {useLocation,useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles';
import {Switch, Route} from 'react-router-dom';
import Login from '../../views/Login';
import Register from '../../views/Register';
import { Topbar } from './components';
import RouteName from '../../utils/RouteName';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const currentUrl = useLocation().pathname;
  let redirect = null;
  // 如果url不做任何指定，则跳转到登录界面，如果url被指定为Register，则跳转到注册界面
  // 如果URL是其它值，则跳转到登录界面，但是在控制台报错
  if (currentUrl === RouteName.AUTHENTIC_PAGE){
    history.push(RouteName.AUTHENTIC_PAGE+RouteName.AUTH_LOGIN);
    console.log('no page delegated, auto redirect to login page')
  }
  else if (currentUrl===RouteName.AUTHENTIC_PAGE+RouteName.AUTH_LOGIN)
    console.log('to login page');
  else if (currentUrl===RouteName.AUTHENTIC_PAGE+RouteName.AUTH_REGISTER){
    console.log('to register page')
  }
  else{
    history.push(RouteName.AUTHENTIC_PAGE+RouteName.AUTH_LOGIN);
    console.log('illegal authentic url, auto redirect to login page')
  }
  return (
    <Fragment>
      <Topbar />
      <div className={classes.content}>
        <Switch>
          <Route path={RouteName.AUTHENTIC_PAGE+RouteName.AUTH_LOGIN}><Login/></Route>
          <Route path={RouteName.AUTHENTIC_PAGE+RouteName.AUTH_REGISTER}><Register/></Route>
        </Switch>
      </div>
      {redirect}
    </Fragment>
  );
};


export default Auth;
