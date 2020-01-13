import React, {useState} from "react";
import ParaName from '../../../../utils/ParaName'
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PieChartIcon from '@material-ui/icons/PieChart';
import FilterListIcon from '@material-ui/icons/FilterList';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RouteName from "../../../../utils/RouteName";
import {useHistory} from 'react-router-dom'
import Filter from "./subview/Filter";
import SaveResult from "./subview/SaveResult";
import Statistic from "./subview/Statistics";
import VisitList from "./subview/VisitList";
import {
    Switch,
    Route,
    useParams
} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: '100%',
    },
    speedDialRoot: {
        position: 'absolute',
        left: "92%",
        top: "3%"
    },
    page:{
        width: "100%",
        height: '100%',
    }
}));

const actions = [
    { icon: <PieChartIcon />, title: 'statistic', label: "统计分析", url:RouteName.STATISTICS},
    { icon: <SaveIcon />, title: 'save', label: "结果存储", url:RouteName.SAVE_RESULT},
    { icon: <ListAltIcon />, title: 'list', label: '病人列表', url:RouteName.VISIT_LIST},
    { icon: <FilterListIcon />, title: 'filter', label: '筛选条件', url:RouteName.FILTER},
];

const GroupAnalysis = () =>{
    document.title = ParaName.HF_STOP+"群体分析";
    const {queryID} = useParams();
    const history = useHistory();
    const classes = useStyles();
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS+"/"+queryID;
    const pathWithoutID = RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS;
    const [open, setOpen] = useState(false);

    return (
        <div className={classes.root}>
            <SpeedDial
                ariaLabel="SpeedDial tooltip"
                className={classes.speedDialRoot}
                direction={'down'}
                icon={<SpeedDialIcon />}
                onClose={()=>setOpen(false)}
                onOpen={()=>setOpen(true)}
                open={open}
            >
                {actions.map(action => (
                    <SpeedDialAction
                        key={action.title}
                        icon={action.icon}
                        tooltipTitle={action.label}
                        onClick={()=>{
                            setOpen(false);
                            history.push(path+action.url)
                        }}
                        title={action.label}/>
                ))}
            </SpeedDial>
            <Switch>
                <Route path={pathWithoutID+'/:queryID'+RouteName.SAVE_RESULT}>
                    <div className={classes.page}>
                        <SaveResult />
                    </div>
                </Route>
                <Route path={pathWithoutID+'/:queryID'+RouteName.STATISTICS}>
                    <div className={classes.page}>
                        <Statistic
                            selectedQueryID={queryID}
                        />
                    </div>
                </Route>
                <Route path={pathWithoutID+'/:queryID'+RouteName.VISIT_LIST}>
                    <div className={classes.page}>
                        <VisitList />
                    </div>
                </Route>
                <Route path={pathWithoutID+'/:queryID'+RouteName.FILTER}>
                    <div className={classes.page}>
                        <Filter />
                    </div>
                </Route>
            </Switch>
        </div>
    )
};

export default GroupAnalysis;