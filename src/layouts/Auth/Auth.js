import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {Switch, Route, Redirect} from 'react-router-dom';
import Login from '../../views/Login';
import Register from '../../views/Register';
import { useRouteMatch } from 'react-router-dom';
import { Topbar } from './components';
import {useSelector} from 'react-redux';
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

const Auth = props => {
  const match = useRouteMatch()
  const classes = useStyles();
  let contentURL = RouteName.AUTH_LOGIN;

  return (
    <Fragment>
      <Topbar />
      <main className={classes.content}>
        <Login />
      </main>
      <Redirect to={match.url+contentURL} />
    </Fragment>
  );
};

Auth.propTypes = {
  route: PropTypes.object
};

export default Auth;
