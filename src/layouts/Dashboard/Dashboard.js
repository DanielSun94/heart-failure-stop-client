import React from 'react';
import RouteName from '../../RouteName';
import BlankPage from '../../components/blank-page/blank-page';
import TrajectoryAnalysisModule from '../../components/trajectory-analysis/TrajectoryAnalysisModule';
import { makeStyles } from '@material-ui/styles';
import { NavBar, TopBar } from './components';
import { connect } from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {TRAJECTORY_ANALYSIS_MODULE, toggleMobileView} from '../../actions/dashboardAction/dashboardAction';

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
    default: contentUrl=RouteName.DASHBOARD_BLANK_PAGE;
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
        <main className={classes.content}>
          <Redirect to={RouteName.MAIN_PAGE+contentUrl} />
        </main>
      </div>

      <Switch>
        <Route path={RouteName.MAIN_PAGE+RouteName.DASHBOARD_TRAJECTORY_ANALYSIS}>
          <TrajectoryAnalysisModule />
        </Route>
        <Route path={RouteName.MAIN_PAGE+RouteName.DASHBOARD_BLANK_PAGE}>
          <BlankPage />
        </Route>
      </Switch>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  let content = state.dashboardContent.dashboardGeneralInfo.frontStagePage;
  let mobileView = state.dashboardContent.dashboardGeneralInfo.mobileView;
  return ({dashboardContent: content, openNavBarMobile: mobileView})
  }

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleNavBarMobileOpen: () => dispatch(toggleMobileView(true)),
  handleNavBarMobileClose: () => dispatch(toggleMobileView(false))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPresentationalComponent)