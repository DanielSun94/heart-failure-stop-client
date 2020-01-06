import React from 'react';
import RouteName from '../../utils/RouteName';
import BlankPage from '../../components/blank-page/blank-page';
import { makeStyles } from '@material-ui/styles';
import { NavBar } from './components';
import {
  Switch, 
  Route} from 'react-router-dom';
import AccountManagement from '../../views/account/AccountManagement'
import AlgorithmManagement from '../../views/algorithm/AlgorithmManagement'
import Analysis from '../../views/analysis/Analysis'
import DataOutput from '../../views/output/DataOutput'

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

export default MainPage