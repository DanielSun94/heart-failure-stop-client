/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField } from '@material-ui/core';
import {login} from '../../../../actions/sessionActions'
import validate from 'validate.js';

const schema = {
  "userName": {
    presence: {allowEmpty: false, message: "不能为空"}
  },
  "password": {
    presence: {allowEmpty: false, message: "不能为空"}
  }
}

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const LoginForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    validToSubmit: false,
    values: {userName: '', password: ''},
    touched: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
    
  };

  const handleSubmit = async event => {
    event.preventDefault();
    let userName = formState.values.userName
    let password = formState.values.password
    let params = {"userName": userName, "password": password}
    dispatch(login(params));
  };

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          fullWidth
          label="用户名"
          name= "userName"
          onChange={handleChange}
          value={formState.values.userName || ''}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="密码"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.values.password || ''}
          variant="outlined"
        />
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        登录
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
