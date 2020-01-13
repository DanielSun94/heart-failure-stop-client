import React, {useEffect} from 'react';
import RouteName from '../../utils/RouteName';
import BlankPage from '../../components/blank-page/blank-page';
import { makeStyles } from '@material-ui/styles';
import { NavBar } from './components';
import {
  Switch,
  Route
} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import AccountManagement from '../../views/account/AccountManagement'
import AlgorithmManagement from '../../views/algorithm/AlgorithmManagement'
import Analysis from '../../views/analysis/Analysis'
import DataOutput from '../../views/output/DataOutput'
import ParaName from "../../utils/ParaName";
import {examSetState} from "../../actions/individualAnalysisAction/examAction";
import {labTestSetState} from "../../actions/individualAnalysisAction/labtestResultAction";
import {vitalSignSetState} from "../../actions/individualAnalysisAction/vitalSignAction";
import {trajectorySetState} from "../../actions/individualAnalysisAction/trajectoryAction";
import {patientBasicInfoSetState} from "../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction";
import {modelSetState} from "../../actions/individualAnalysisAction/modelAction";
import {orderSetState} from "../../actions/individualAnalysisAction/orderAction";
import {metaInfoSetState} from "../../actions/metaInfoAction";
import {fetchModelListPosts} from "../../actions/algorithmManagementAction";

const useStyles = makeStyles(() => ({
  root: {
    // 根据父级对象的大小的百分比确定本元素大小
    width: '100%',
    display: 'flex',
    // display用于定义该块下的元素的一些展示方式
    // flex是一种可以根据屏幕大小进行元素自适应调整的排序方式
    flexDirection: 'row',
    // 当内容溢出本元素时候的做法，hidden指直接隐藏，另外可以用scroll的属性，加滚动条使得能够完整显示
    overflow: 'hidden',
    height: '100%',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    minHeight: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  navBar: {
    width: "3%",
    minWidth: 56,
    height: '100%',
    // flex指代flex grow，flex-shrink和flex-basis，因此有三个属性
    // 该三个元素用于标记本元素（在沿主轴方向排列后）如何分配父级元素中的空间（主轴默认为水平方向从左至右，可以通过flexDirection设定）
    // grow指：同级元素排列之后，剩余空间的分配比例。
    // 假设我们有三个元素在一个块中，该属性都是1，则剩余空间等分，如果某个元素的该值是3，剩下的两个还是1，则该元素多占据60%的剩余空间。
    // grow为0,代表不参与元素扩张
    // shrink指元素压缩，flex默认元素横向排列且不换行，因此可能出现元素溢出父级块的情况。此处的算法有点麻烦，精确计算要算方程，此处不展开
    // 同样，shrink为0代表不参与压缩
    // basis指本元素的默认大小，即向父级块预约空间，这部分空间不会参与剩余空间的分配。auto指本元素大小根据其具体内容自动设定。
    // Flex的一大麻烦点在于，其与Width，MinWidth连用时，优先级怎么算，这非常麻烦，具体参考https://www.cnblogs.com/oxspirt/p/11070739.html
  },
  content: {
    height: '100%',
    width: '97%'
  }
}));

const MainPage= () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const entireState = useSelector(state=> state);
  const currentSessionUser = useSelector(state=> state.session.user.userID);
  const token = useSelector(state=> state.session.authenticToken);

  useEffect(()=>{
    // 每次重登陆时更新ModelList
    // 目前这种第一次进入界面载入算法库的设计存在缺陷，体现在两个用户同时在线，其中一个用户删除了一个公开算法时
    // 另一个用户无法感知，这一问题留待以后使用WebSocket解决
    dispatch(fetchModelListPosts());
  }, []);

  useEffect(()=>{
    // 每次有人登陆，都加载一遍该用户上次访问的metaInfo和具体分析数据
    // 按照目前的路由设计，登出和登陆一定会造成MainPage的重加载，因此不会出现用户A退出，用户B登录，结果B看到了A的数据的情况
    // 同时，userID异步获取，可能第一次刷这个component的时候还没回来，所以我们要在userID变化时重刷，所以dependency不能设空，
    // 在一个session中userID只会被置一次，从逻辑上看，这是一个只会执行一次的effect函数
    reloadOrResetState(currentSessionUser, token, dispatch);

  }, [currentSessionUser]);

  // 上传state
  useEffect(()=>{
    // 为防止saveState先于reload执行，reload之后metaInfo Map的size一定不为0
    // 如果真的是0，说明上轮把所有查询删光了，那先于reload执行无关紧要
    if(Object.keys(entireState.metaInfo.metaInfoMap).length>0){
      saveState(currentSessionUser, token, entireState)
    }
  }, [entireState, currentSessionUser]);

  return (
      <div id='mainPage' className={classes.root}>
        <div className={classes.navBar}>
          <NavBar />
        </div>
        <main className={classes.content}>
          <Switch>
            <Route path={RouteName.MAIN_PAGE+RouteName.ANALYSIS}>
              <Analysis />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.DATA_OUTPUT}>
              <DataOutput />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.ALGORITHM_MANAGEMENT}>
              <AlgorithmManagement />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.ACCOUNT_MANAGEMENT}>
              <AccountManagement />
            </Route>
            {
              // black page只在出现错误的情况下出现
            }
            <Route path={RouteName.MAIN_PAGE}>
              <BlankPage />
            </Route>
          </Switch>
        </main>
      </div>
  );
};

const reloadOrResetState = (currentSessionUser, token, dispatch) =>{
  if(currentSessionUser.toString().length>0) {
    let url = RouteName.B_STATE_MANAGEMENT + RouteName.B_DOWNLOAD_STATE + '?userID=' + currentSessionUser;
    let header = {'Authorization': token};
    fetch(url, {method: ParaName.GET, headers: header})
        .then(res => res.json())
        .then(res=>{
          return res
        })
        .then(res=>res.response)
        .then((res)=>{
          if(res!=='CacheStateNotFound'){
            res = JSON.parse(res);
            const individual = res.individual;
            dispatch(examSetState(individual.exam));
            dispatch(patientBasicInfoSetState(individual.unifiedPatientIDAndPatientBasicInfo));
            dispatch(trajectorySetState(individual.trajectory));
            dispatch(labTestSetState(individual.labtestResult));
            dispatch(orderSetState(individual.order));
            dispatch(vitalSignSetState(individual.vitalSign));
            dispatch(modelSetState(individual.model));
            const metaInfo = res.metaInfo;
            dispatch(metaInfoSetState(metaInfo))
          }
        })
  }
};

const saveState=(currentSessionUser, token, entireState)=>{
  if(currentSessionUser.toString().length>0) {
    let url = RouteName.B_STATE_MANAGEMENT + RouteName.B_UPDATE_STATE;
    let header = {'Authorization': token};
    let formData = new FormData();
    const jsonStr = JSON.stringify(entireState);
    formData.append('userID', currentSessionUser);
    formData.append('stateContent', jsonStr);
    // 目前只做只管发出，不管是否成功
    fetch(url, {method: ParaName.POST, headers: header, body: formData}).then(() => null);
  }
};

export default MainPage