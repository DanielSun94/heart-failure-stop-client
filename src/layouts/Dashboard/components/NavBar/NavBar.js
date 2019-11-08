import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Drawer, Divider, Avatar, Typography } from '@material-ui/core';
import Navigation from '../../../../components/public-available-component/Navigation';
import {useDispatch} from 'react-redux'
import {logout} from "../../../../actions/sessionActions"

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflowY: 'auto'
  },
  content: {
    padding: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2)
  },
  navigation: {
    marginTop: theme.spacing(2)
  }
}));

const NavBar = props => {
  const { openMobile, onMobileClose, className, ...rest } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const session = useSelector(state => state.session);

  const navigationConfig = [
    {
      title: 'Pages',
      pages: [
        {
          title: '概览',
          handleClick: ()=>{console.log('概览')}
        },
        {
          title: '全流程分析',
          handleClick: ()=>{console.log('全流程分析')}
        },
        {
          title: '人群比较',
          handleClick: ()=>{console.log('人群比较')}
        },
        {
          title: '知识图谱',
          handleClick: ()=>{console.log('知识图谱')}
        },
        {
          title: '账户管理',
          handleClick: ()=>{console.log('账户管理')}
        },
        {
          title: '退出登录',
          handleClick: ()=>{dispatch(logout())}
        },
      ]
    },
  ];
  

  //当页面发生变化时，自动关闭NavBar
  useEffect(() => {
    if (openMobile) {
      onMobileClose && onMobileClose();
    }
  }, [useSelector(state=>state.dashboardContent.dashboardGeneralInfo.frontStagePage)]);

  const navbarContent = (
    <div className={classes.content}>
      {
        // 用户个人信息
        // 目前先不显示Avatar中的头像
        // src={session.user.avatar}
      }
      <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src= {null}
          to="/profile/1/timeline"
        />
        <Typography
          className={classes.name}
          variant="h4"
        >
          {session.user.userName}
        </Typography>
        <Typography variant="body2">{session.user.bio}</Typography>
      </div>
      <Divider className={classes.divider} />

      {
        // 导航栏正文，下面的nav标签并没有实际效果，仅仅作为语义标签使用，表示这个标签里面的是一组链接
      }
      <nav className={classes.navigation}>
        {navigationConfig.map(list => (
          <Navigation
            component="div"
            key={list.title}
            pages={list.pages}
            title={list.title}
          />
        ))}
      </nav>
    </div>
  );

  // 抽屉导航栏，屏幕较大时持久显示，屏幕较小时要点击才拉开, clsx用于css的多类匹配
  return (
    <Fragment>
      <Drawer
        anchor="left"
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        <div
          {...rest}
          className={clsx(classes.root, className)}
        >
          {navbarContent}
        </div>
      </Drawer>
    </Fragment>
  );
};

NavBar.propTypes = {
  className: PropTypes.string,
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default NavBar;
