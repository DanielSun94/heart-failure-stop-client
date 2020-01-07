import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import gradients from '../../utils/gradients';
import { LoginForm } from './components';
import RouteName from '../../utils/RouteName'
import ParaName from '../../utils/ParaName'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(20, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'end',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Login = () => {
  const classes = useStyles();
  document.title = ParaName.HF_STOP+"登录";

  return (
    <div className = {classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
          >
            登录
          </Typography>
          <Typography variant="subtitle2">
            登录以访问内部数据
          </Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to={RouteName.AUTHENTIC_PAGE+RouteName.AUTH_REGISTER}
            underline="always"
            variant="subtitle2"
          >
            注册新账户
          </Link>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/images/auth.jpg"
          title="Cover"
        >
          <Typography
            color="inherit"
            variant="subtitle1"
          >
            本应用为Heart Failure Stop的Demo
          </Typography>
          <div className={classes.person}>
            <div>
              <Typography
                color="inherit"
                variant="body1"
              >
                浙江大学
              </Typography>
              <Typography
                color="inherit"
                variant="body2"
              >
                生物医学工程与仪器科学学院
              </Typography>
            </div>
          </div>
        </CardMedia>
      </Card>
    </div>
  );
};

export default Login;
