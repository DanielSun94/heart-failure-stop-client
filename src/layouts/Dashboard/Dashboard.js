import React, {useState} from 'react';
import RouteName from '../../utils/RouteName';
import BlankPage from '../../components/blank-page/blank-page';
import { makeStyles } from '@material-ui/styles';
import { NavBar, TopBar } from './components';
import { useHistory, useLocation } from 'react-router-dom';
import {Switch, Route} from 'react-router-dom';
import TrajectoryAnalysisModule from '../../views/trajectory-analysis/TrajectoryAnalysisModule'
import AccountManagement from '../../views/account-management/AccountManagement'
import GroupComparison from '../../views/group-comparison/GroupComparison'
import Overview from '../../views/overview/Overview'
import KnowledgeGraph from '../../views/knowledge-graph/KnowledgeGraph'

const useStyles = makeStyles(() => ({
  root: {
    // 根据父级对象的大小的百分比确定本元素大小
    height: '100%',
    width: '100%',
    display: 'flex',
    // display用于定义该块下的元素的一些展示方式
    // flex是一种可以根据屏幕大小进行元素自适应调整的排序方式
    flexDirection: 'column',
    // 当内容溢出本元素时候的做法，hidden指直接隐藏，另外可以用scroll的属性，加滚动条使得能够完整显示
    overflow: 'hidden'
  },
  topBar: {
    // react中的宽度以dp为单位，默认不写，这是一种能自动适配不同屏幕的计量方式
    // 1 dp = (pixel widths * 160) / screen density，由于screen density是用单位长度（1厘米）下的像素点数量衡量的
    // 因此dp是一个和屏幕实际尺寸和像素密度均无关的一种逻辑长度
    // z-index是堆叠元素时的显示顺序，越大的元素越靠前
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  navBar: {
    zIndex: 3,
    width: 256,
    // 规定元素的最小大小，只有在元素溢出父级块时使用。
    minWidth: 256,
    // flex指代flex grow，flex-shrink和flex-basis，因此有三个属性
    // 该三个元素用于标记本元素（在沿主轴方向排列后）如何分配父级元素中的空间（主轴默认为水平方向从左至右，可以通过flexDirection设定）
    // grow指：同级元素排列之后，剩余空间的分配比例。
    // 假设我们有三个元素在一个块中，该属性都是1，则剩余空间等分，如果某个元素的该值是3，剩下的两个还是1，则该元素多占据60%的剩余空间。
    // grow为0,代表不参与元素扩张
    // shrink指元素压缩，flex默认元素横向排列且不换行，因此可能出现元素溢出父级块的情况。此处的算法有点麻烦，精确计算要算方程，此处不展开
    // 同样，shrink为0代表不参与压缩
    // basis指本元素的默认大小，即向父级块预约空间，这部分空间不会参与剩余空间的分配。auto指本元素大小根据其具体内容自动设定。
    // Flex的一大麻烦点在于，其与Width，MinWidth连用时，优先级怎么算，这非常麻烦，具体参考https://www.cnblogs.com/oxspirt/p/11070739.html
    flex: '0 0 auto'
  },
  content: {
    // auto一般等价于scroll，溢出部分会用滚动条显示
    overflowY: 'auto',
    flex: '1 1 auto'
  }
}));

const Dashboard= () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [navBarOpen, setNavBarOpen] = useState(false)
  const handleNavBarMobileClose = () => setNavBarOpen(false)
  const handleNavBarMobileOpen = () => setNavBarOpen(true)
  let currentLocation = location.pathname

  // 确定跳转路径，默认状态下跳转到trajectory analysis界面
  if(currentLocation === RouteName.MAIN_PAGE)
    history.push(RouteName.MAIN_PAGE+RouteName.DASHBOARD_TRAJECTORY_ANALYSIS)


  // 有关抽屉式导航栏，采取如下响应式设计：
  // 当界面较小时，在TopBar上建立一个按钮，要按一下这个按钮才显示Drawer
  // 当界面较大时，直接显示抽屉导航栏，TopBar上的按钮不渲染
  // 这就是为什么TopBar里要加入显示NavBar的回调。NavBar里加入关闭的回调则是要给予小屏幕下抽屉打开后，还能关闭的能力
  // 当然，此处实现同样的功能也存在不同的写法，我们这里是下载的模板，因此不对原有代码做过多修改
  // 待后期做了更多的界面，此处可以添加更多的可跳转选项
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
          openMobile={navBarOpen}
        />
        <main className={classes.content}>
          <Switch>
            <Route path={RouteName.MAIN_PAGE+RouteName.DASHBOARD_BLANK_PAGE}>
                <BlankPage />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.DASHBOARD_TRAJECTORY_ANALYSIS}>
                <TrajectoryAnalysisModule />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.GROUP_ANALYSIS}>
                <GroupComparison />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.KNOWLEDGE_GRAPH}>
                <KnowledgeGraph />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.ACCOUNT_MANAGEMENT}>
                <AccountManagement />
            </Route>
            <Route path={RouteName.MAIN_PAGE+RouteName.OVERVIEW}>
                <Overview />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Dashboard