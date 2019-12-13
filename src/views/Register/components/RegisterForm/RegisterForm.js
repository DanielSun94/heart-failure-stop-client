import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import validate from 'validate.js';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link
} from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import {signUp, signupUserExistExam} from '../../../../actions/sessionActions'
import {useDispatch} from 'react-redux';

const schema = {
  '用户名': {
    presence: { allowEmpty: false, message: '不能为空' },
    length: {
      maximum: 32
    }
  },
  '真实姓名': {
    presence: { allowEmpty: false, message: '不能为空' },
    length: {
      maximum: 32
    }
  },
  '密码': {
    presence: { allowEmpty: false, message: '不能为空' },
    length: {
      maximum: 64
    }
  },
  '重复输入密码': {
    presence: { allowEmpty: false, message: '不能为空' },
    length: {
      maximum: 128
    }
  },
};

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
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  }
}));

const RegisterForm = props => {
  const { className, ...rest } = props;
  const history = useHistory()
  const classes = useStyles();
  const dispatch = useDispatch();

  const [signupResponse, setSignupResponse] = useState({'status': false, 'message': ""})
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    // 在validate做完TextInput的非空校验的基础上
    // 当用户名没有重复，输入没有错误，按下了注册条件的选框时，开启注册按钮
    let roleValid = false;

    let errors = validate(formState.values, schema);

    if (formState.values['重复输入密码'] && formState.values['密码']){
      if(!(formState.values['重复输入密码']===formState.values['密码'])){
        errors ? errors['重复输入密码'] = ['密码输入不一致'] : errors = {'重复输入密码': ['密码输入不一致']};
      }
    }
    
    if (formState.values['policy'])
      roleValid = true
    
    if(formState.values['用户名'] && formState.values['用户名'].length > 0){
      dispatch(signupUserExistExam({'userName': formState.values['用户名']}))
      .then(res => {
        if(res){
          errors ? errors['用户名'] = ['当前用户名已被占用'] : errors = {'用户名': ['当前用户名已被占用']}
        }
      })
      .then(() => {
        setFormState(formState => ({
          ...formState,
          isValid: (!errors) && roleValid,
          errors: errors || {}
        }));
      })
      setSignupResponse(() => ({'status': false, 'message': ""}));
    }
    else{
      setFormState(formState => ({
        ...formState,
        isValid: (!errors),
        errors: errors || {}
      }));
      setSignupResponse(() => ({'status': false, 'message': ""}));
    }
  }, [formState.values, dispatch]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // 若能成功注册，返回主页，然后重定向到login界面
    const userName = formState.values['用户名']
    const realName = formState.values['真实姓名']
    const password = formState.values['密码']
    let params = {'userName': userName, 'realName': realName, 'password': password}
    dispatch(signUp(params))
    .then(res => {
      if(res.success){
        setSignupResponse(() => ({'status': true, 'message': "注册成功，即将跳转到登录页面"}))
        setTimeout(() => history.push('/authentic'), 1500)
      }
      else{
        setSignupResponse(() => ({'status': true, 'message': "注册失败，请检查网络或更改用户名"}))
      }
    })
  };

  const hasError = field =>{
    return formState.errors[field] ? true : false
  }

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.fields}>
        <TextField
          error={hasError('用户名')}
          helperText={
            hasError('用户名') ? formState.errors['用户名'][0] : "当前用户名可用"
          }
          label="用户名"
          name="用户名"
          onChange={handleChange}
          value={formState.values['用户名'] || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('真实姓名')}
          helperText={
            hasError('真实姓名') ? formState.errors['真实姓名'][0] : null
          }
          label="真实姓名"
          name="真实姓名"
          onChange={handleChange}
          value={formState.values['真实姓名'] || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('密码')}
          fullWidth
          helperText={hasError('密码') ? formState.errors['密码'][0] : null}
          label="密码"
          name="密码"
          type="password"
          onChange={handleChange}
          value={formState.values['密码'] || ''}
          variant="outlined"
        />
        <TextField
          error={hasError('重复输入密码')}
          fullWidth
          helperText={
            hasError('重复输入密码') ? formState.errors['重复输入密码'][0] : null
          }
          label="重复输入密码"
          name="重复输入密码"
          onChange={handleChange}
          type="password"
          value={formState.values['重复输入密码'] || ''}
          variant="outlined"
        />
        <div>
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              我已阅读
              <Link
                color="secondary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                注册条件
              </Link>
            </Typography>
          </div>
          {hasError('policy') && (
            <FormHelperText error>{formState.errors.policy[0]}</FormHelperText>
          )}
        </div>
      </div>
      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        创建账户
      </Button>
      {signupResponse.status&&
      <Typography
        color="error"
        variant="body2"
        >
        {signupResponse.message}
      </Typography>
      }
    </form>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
