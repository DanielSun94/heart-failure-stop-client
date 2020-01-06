import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {useHistory} from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Divider,
  Box,
  colors
} from '@material-ui/core';
import {useDispatch} from 'react-redux'
import {logout} from "../../../../actions/sessionActions"
import RouteName from '../../../../utils/RouteName'
import AssessmentIcon from '@material-ui/icons/Assessment';
import TableChartIcon from '@material-ui/icons/TableChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TuneIcon from '@material-ui/icons/Tune';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: colors.grey[200]
  },
  navBar:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: "100%",
    alignItems: 'center'
  },
  group: {
    width: '100%'
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItem: {
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%'
  },
  listItemIcon: {
    width: '100%',
    display: 'flex',
    alignmentItems: 'center',
    justifyContent: 'center'
  }
}));

// 一级导航栏，不可关闭
const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(2);

  //初始状态下默认打开分析界面
  useEffect(()=>{
    history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS)
  }, []);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    if(index === 0)
      history.push(RouteName.MAIN_PAGE+RouteName.ANALYSIS);
    else if(index === 1)
      history.push(RouteName.MAIN_PAGE+RouteName.DATA_OUTPUT);
    else if(index === 2)
      history.push(RouteName.MAIN_PAGE+RouteName.ALGORITHM_MANAGEMENT);
    else if(index === 3)
      history.push(RouteName.MAIN_PAGE+RouteName.ACCOUNT_MANAGEMENT);
    else if(index === 4)
      dispatch(logout())
  };

  return (
      <Box
          className={classes.root}
      >
        <div className={classes.navBar}>
          <div id={'function-group'} className={classes.group}>
            <List className={classes.list}>
              <Tooltip title="数据分析">
                <ListItem className={classes.listItem}
                          button
                          key={'dataAnalysis'}
                          selected={selectedIndex === 0}
                          onClick={event => handleListItemClick(event, 0)}>
                  <ListItemIcon
                      className={classes.listItemIcon}
                  >
                    <AssessmentIcon/>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
              <Tooltip title="数据输出">
                <ListItem className={classes.listItem}
                          button
                          key={'dataOutput'}
                          selected={selectedIndex === 1}
                          onClick={event => handleListItemClick(event, 1)}>
                  <ListItemIcon
                      className={classes.listItemIcon}
                  >
                    <TableChartIcon/>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
              {
                // 此处margin的目的是能够和在算法选择时，divider能和算法类别的第一个expansion panel summary的下沿对齐
              }
              <Divider style={{marginTop: 4}}/>
            </List>
          </div>
          <div id={'support-group'}  className={classes.group}>
            <List className={classes.list}>
              <Divider />
              <Tooltip title="算法管理">
                <ListItem className={classes.listItem}
                          button
                          key={'algorithmManagement'}
                          selected={selectedIndex === 2}
                          onClick={event => handleListItemClick(event, 2)}>
                  <ListItemIcon
                      className={classes.listItemIcon}
                  >
                    <TuneIcon/>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
              <Tooltip title="账户管理">
                <ListItem className={classes.listItem}
                          button
                          key={'accountSetting'}
                          selected={selectedIndex === 3}
                          onClick={event => handleListItemClick(event, 3)}>
                  <ListItemIcon
                      className={classes.listItemIcon}
                  >
                    <AccountBoxIcon/>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
              <Tooltip title="退出登录">
                <ListItem className={classes.listItem}
                          button
                          key={'logout'}
                          onClick={event => handleListItemClick(event, 4)}>
                  <ListItemIcon
                      className={classes.listItemIcon}
                  >
                    <ExitToAppIcon/>
                  </ListItemIcon>
                </ListItem>
              </Tooltip>
            </List>
          </div>
        </div>
      </Box>
  );
};

export default NavBar;
