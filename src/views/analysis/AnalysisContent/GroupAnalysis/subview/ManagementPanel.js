import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab,
    Button,
    colors
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import {changeManagementQueryTab} from "../../../../../actions/groupAnalysisAction/managementAction";
import FilterDialog from "./FilterDialog";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: '100%',
        display:'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
    selectionPanel: {
        width: '100%',
        height: 85,
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    filterPanel: {
        width: '100%',
        height: window.innerHeight-86,
        overflow: 'auto',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
}));

const ManagementPanel =({queryID, setToggleFilter, toggleFilter})=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectedTab = useSelector(state=>state.group.management[queryID].selectedTab);
    const [openDialog, setDialogVisible] = useState(false);

    const notSelectStyle =
        {minHeight:42, maxWidth: 500, width: '100%', borderRightColor: colors.grey[200],
        borderRightStyle: 'solid', borderRightWidth: 1};
    return (
        <div className={classes.root}>
            <div className={classes.selectionPanel}>
                <Tabs
                    orientation="vertical"
                    value={selectedTab}
                    textColor={'primary'}
                    indicatorColor={'primary'}
                    variant="scrollable"
                    onChange={(event, newValue)=>dispatch(changeManagementQueryTab(newValue, queryID))}
                >
                    <Tab label="统计分析结果" value={'statistic'}
                         style={selectedTab==='statistic' ? {maxWidth: 500, minHeight:42}:notSelectStyle}
                    />
                    <Tab label="病人清单" value={'patientList'}
                         style={selectedTab==='patientList'? {maxWidth: 500, minHeight:42}:notSelectStyle}
                    />
                </Tabs>
            </div>
            <div className={classes.filterPanel}>
                <span style={{paddingTop: 18, paddingLeft: 12}}>过滤器</span>
                <span style={{paddingTop: 18, paddingLeft: 12}}>To Be Done</span>
                <Button
                    style={{paddingTop: 18, paddingLeft: 12}}
                    color={'primary'}
                    onClick={()=>{
                        setToggleFilter(!toggleFilter);
                        setDialogVisible(true);
                        dispatch(changeManagementQueryTab("filter", queryID))
                    }}
                >
                    过滤器重设
                </Button>
            </div>
            <FilterDialog
                queryID={queryID}
                openDialog={openDialog}
                setDialogVisible={setDialogVisible}
            />
        </div>
    )
};

export default ManagementPanel;