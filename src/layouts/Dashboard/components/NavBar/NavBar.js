import React, { Fragment, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {useHistory} from 'react-router-dom'
import { Drawer, Divider, Avatar, Typography } from '@material-ui/core';
import Navigation from '../../../../components/public-available-component/Navigation';
import {useDispatch, useSelector} from 'react-redux'
import {logout} from "../../../../actions/sessionActions"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import RouteName from '../../../../utils/RouteName'

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
  const history = useHistory();
  const classes = useStyles();
  const userName = useSelector(state => state.session.user.userName);
  const realName = useSelector(state => state.session.user.realName);

  const navigationConfig = [
    {
      title: 'Pages',
      pages: [
        {
          title: '概览',
          icon: HomeIcon,
          handleClick: ()=>{history.push(RouteName.MAIN_PAGE+RouteName.OVERVIEW)}
        },
        {
          title: '全流程分析',
          icon: BarChartIcon,
          handleClick: ()=>{history.push(RouteName.MAIN_PAGE+RouteName.DASHBOARD_TRAJECTORY_ANALYSIS)}
        },
        {
          title: '人群比较',
          icon: PeopleIcon,
          handleClick: ()=>{history.push(RouteName.MAIN_PAGE+RouteName.GROUP_ANALYSIS)}
        },
        {
          title: '知识图谱',
          icon: DashboardIcon,
          handleClick: ()=>{history.push(RouteName.MAIN_PAGE+RouteName.KNOWLEDGE_GRAPH)}
        },
        {
          title: '账户管理',
          icon: SettingsIcon,
          handleClick: ()=>{history.push(RouteName.MAIN_PAGE+RouteName.ACCOUNT_MANAGEMENT)}
        },
        {
          title: '退出登录',
          icon: ExitToAppIcon,
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
  }, [useSelector(state=>state.frontPage.frontPage)]);

  const navbarContent = (
    <div className={classes.content}>
      {
        // 用户个人信息
        // 目前未做病人头像收集功能，统一用浙大校徽替代
      }
      <div className={classes.profile}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src= "/images/avatars/avatar_zhejiang_university.png"
        />
        <Typography
          className={classes.name}
          variant="h4"
        >
          {realName}
        </Typography>
        <Typography variant="body2">{userName}</Typography>
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
