import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {
    Tab,
    Tabs,
    colors,
    Fab
} from '@material-ui/core'
import {makeStyles} from "@material-ui/styles";
import IndividualAnalysis from "./IndividualAnalysis/IndividualAnalysis";
import GroupAnalysis from "./GroupAnalysis/GroupAnalysis";
import {useSelector, useDispatch} from "react-redux";
import RouteName from "../../../utils/RouteName";
import {editQueryName, setSelectedQuery} from "../../../actions/metaInfoAction";
import {
    Switch,
    Route
} from 'react-router-dom';
import ParaName from "../../../utils/ParaName";
import {DoubleClickToEdit, DeleteDialog} from "../AnalysisManagement/AnalysisManagement";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflow: 'auto',
    },
    tabContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        maxWidth: 244
    },
    closeIcon: {
        backgroundColor: "#F8F8F8",
        "&:hover": {
            backgroundColor: colors.grey[200]
        },
        boxShadow: "none"
    }
}));

const AnalysisContent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [deleteDialogVisibleStatus, setDeleteDialogVisibleStatus] = useState(false);

    const selectedQuery =  useSelector(state=>state.metaInfo.selectedQuery);
    const metaInfoMap = useSelector(state=>state.metaInfo.metaInfoMap);
    const selectedMetaInfo = metaInfoMap[selectedQuery];
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS;

    if(!selectedMetaInfo){
        return null;
    }

    const handleChange = (event, newValue) => {
        const queryType = metaInfoMap[newValue].queryType === ParaName.GROUP_ANALYSIS;
        if(queryType){
            history.push(path+RouteName.GROUP_ANALYSIS+"/"+newValue)
        }
        else{
            history.push(path+RouteName.INDIVIDUAL_ANALYSIS+"/"+newValue);
        }
        dispatch(setSelectedQuery(Number.parseInt(newValue)));
    };

    return (
        <div className={classes.root}>
            <div style={{
                backgroundColor: '#F8F8F8',
                borderBottomColor: colors.grey[200],
                borderBottomStyle: 'solid',
                borderBottomWidth: 1
            }}>
                <Tabs
                    value={selectedQuery.toString()}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {
                        Object.keys(metaInfoMap).map(index =>
                            <Tab
                                style={{textTransform: "none"}}
                                label={
                                    <TabContent
                                        queryName={metaInfoMap[index].queryName}
                                        queryID={index}
                                        setDeleteDialogVisible={setDeleteDialogVisibleStatus}
                                    />}
                                key={index}
                                value={index.toString()}
                            />)
                    }
                </Tabs>
            </div>
            <Switch>
                <Route path={path+RouteName.GROUP_ANALYSIS+"/:queryID"}>
                    <GroupAnalysis />
                </Route>
                <Route path={path+RouteName.INDIVIDUAL_ANALYSIS+"/:queryID"}>
                    <IndividualAnalysis />
                </Route>
                <Route path={path+RouteName.BLANK}>
                    <h1> 未选中数据 </h1>
                </Route>
            </Switch>
            <DeleteDialog
                deleteDialogVisible={deleteDialogVisibleStatus}
                setDeleteDialogVisible={setDeleteDialogVisibleStatus}
                selectedQuery={selectedQuery}
            />
        </div>
    )
};

const TabContent=({queryName, queryID, setDeleteDialogVisible})=>{
    const dispatch = useDispatch();
    const classes = useStyles();

    // 用于显示Tab页的query名称，提供删除和修改名称的功能
    // 名称修改和删除功能和AnalysisManagement中重合，因此直接利用该模块中的函数实现
    return(
        <div className={classes.tabContent}>
            <div style={{maxWidth: 234, overflow: "hidden"}}>
                <DoubleClickToEdit
                    defaultValue={queryName}
                    editQuery={(value)=>dispatch(editQueryName(value, true, Number.parseInt(queryID)))}
                />
            </div>
            <Fab
                size={'small'}
                className={classes.closeIcon}>
                <CloseIcon
                    onClick={()=>setDeleteDialogVisible(true)}
                />
            </Fab>
        </div>
    )
};

export default AnalysisContent;