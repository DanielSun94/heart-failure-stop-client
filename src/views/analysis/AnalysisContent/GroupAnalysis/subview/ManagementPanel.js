import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Tab,
    Button,
    colors
} from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import FilterDialog, {filterContentToString} from "./FilterDialog";
import {changeManagementQueryTab} from "../../../../../actions/groupAnalysisAction/managementAction";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        display:'flex',
    },
    selectionPanel: {
        width: 200,
        height: 85,
    },
    filterPanel: {
        width: "calc(100% - 200px)",
        display: 'flex'
    },
}));

const ManagementPanel =({queryID})=>{
    const classes = useStyles();
    const dispatch = useDispatch();

    const selectedTab = useSelector(state=>state.group.management[queryID].selectedTab);
    const [openDialog, setDialogVisible] = useState(false);
    const filter = useSelector(state=>state.group.management[queryID].filter);
    // 只有顶级查询允许重设过滤器
    const isTopLayer = useSelector(state=>state.metaInfo.metaInfoMap[queryID].affiliated);

    const notSelectStyle =
        {minHeight:42, maxWidth: 500, width: '100%', borderRightColor: colors.grey[200],
        borderRightStyle: 'solid', borderRightWidth: 1};

    const filterToString =(filter)=>{
        let str = "";
        for(const index in filter){
            if(filter.hasOwnProperty(index)){
                str += filterContentToString(filter[index])+";     "
            }
        }
        return str
    };

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
                <div style={{width: "90%", display: 'flex', alignItems: 'center'}}>
                    <span style={{width: 150, marginLeft: 20}}>过滤器</span>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {filterToString(filter)}
                    </div>
                </div>

                <Button
                    style={{paddingTop: 18, paddingLeft: 12}}
                    color={'primary'}
                    disabled={(isTopLayer !== null)}
                    onClick={()=>{
                        setDialogVisible(true);
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