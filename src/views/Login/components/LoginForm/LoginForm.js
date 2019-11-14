/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography} from '@material-ui/core';
import {login, loginFailed, loginSuccess, logout, getAccountInfo} from '../../../../actions/sessionActions'
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
  const [loginResponse, setLoginResponse] = useState({'status': false, 'message': ""})

  // 退回Login Form相当于自动执行了Logout方法，该方法仅在组件装载时使用
  // 这一设计是为了防止有人从主界面退回登录界面，再登录时由于loggedin状态不变化导致的不跳转问题
  let mountFlag = true

  useEffect(() => {
    if (mountFlag){
      dispatch(logout());
      mountFlag=false
    }
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

    setLoginResponse(() => ({'status': false, 'message': ""}));
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
    dispatch(login(params))
    // 此处如果登录成功，等待1秒后再进行页面跳转
    // 由于是否转入验证页面由store中的状态控制，此处可以直接通过条件判断自动跳转，而无需手动跳转
    .then(res => {
      let message = res['message']
      setLoginResponse(()=>({'status': true, 'message': message}))
      if(!res['isError'])
        // 在确认登录成功后立即开始查询登录用户的相关信息，并随之完成界面跳转
        setTimeout(() => {
          dispatch(loginSuccess(res))
          dispatch(getAccountInfo({'userName': userName}))
        }, 1)
      else
        dispatch(loginFailed())
    })
    
    ;
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
      {loginResponse.status&&
      <Typography
        color="error"
        variant="body2"
        >
        {loginResponse.message}
      </Typography>
      }
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string
};

export default LoginForm;
