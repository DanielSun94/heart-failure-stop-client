import React from 'react';
import RouteName from '../../RouteName';
import TrajectoryAnalysisModule from '../../components/trajectory-analysis/trajectoryAnalysisModule';
import BlankPage from '../../components/blank-page/blank-page';
import { makeStyles } from '@material-ui/styles';
import { NavBar, TopBar } from './components';
import { connect } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {TRAJECTORY_ANALYSIS_MODULE, BLANK_PAGE} from '../../actions/dashboardAction/dashboardAction'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  }
}));

const DashboardPresentationalComponent = ({dashboardContent, openNavBarMobile, handleNavBarMobileOpen, handleNavBarMobileClose}) => {

  const classes = useStyles();

  let contentUrl = null;
  switch(dashboardContent){
    case TRAJECTORY_ANALYSIS_MODULE: contentUrl=RouteName.DASHBOARD_TRAJECTORY_ANALYSIS; break;
    default: contentUrl=RouteName.BLANK_PAGE;
  }

  return (
    <div className={classes.root}>
      <TopBar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <div className={classes.content}>
          <Redirect to={contentUrl} />
        </div>
      </div>

      <Switch>
        <Route path={RouteName.DASHBOARD_TRAJECTORY_ANALYSIS}>
          <TrajectoryAnalysisModule />
        </Route>
        <Route path={RouteName.BLANK_PAGE}>
          <BlankPage />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPresentationalComponent)