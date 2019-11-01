import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Error = props => {
  const { route } = props;

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <h1> It's Error Page </h1>
    </main>
  );
};

Error.propTypes = {
  route: PropTypes.object
};

export default Error;
