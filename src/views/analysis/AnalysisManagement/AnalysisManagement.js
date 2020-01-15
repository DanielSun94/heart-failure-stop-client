import React, {useState, Fragment} from 'react';
import {makeStyles, withStyles} from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import {
    colors,
    Typography,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {TreeView, TreeItem} from "@material-ui/lab";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useSelector, useDispatch} from "react-redux";
import ParaName from "../../../utils/ParaName";
import QuerySelectionDialog from "./QuerySelectionDialog";
import {setSelectedQuery, setExpandedQueryList, deleteQuery, editQueryName} from "../../../actions/metaInfoAction";
import {useHistory} from 'react-router-dom'
import RouteName from "../../../utils/RouteName";
import {trajectoryDelete} from "../../../actions/individualAnalysisAction/trajectoryAction";
import {vitalSignDelete} from "../../../actions/individualAnalysisAction/vitalSignAction";
import {unifiedIdAndBasicInfoDelete} from "../../../actions/individualAnalysisAction/unifiedPatientIDAndPatientBasicInfoAction";
import {orderDelete} from "../../../actions/individualAnalysisAction/orderAction";
import {examDelete} from "../../../actions/individualAnalysisAction/examAction";
import {labTestDelete} from "../../../actions/individualAnalysisAction/labtestResultAction";
import {modelDeleteAll} from "../../../actions/individualAnalysisAction/modelAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
    },
    treeView: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
        minWidth: 250,
    },
    createNewQuery:{
        height: 85,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderBottomColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
    },
    content:{
        height: 850,
        backgroundColor: 'white',
        overflow: 'auto'
    },
    createNewQueryButton: {
        marginBottom:  theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    itemContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 6
    },
    hover: {
        '&:hover': {
            color: colors.indigo[400]
        }
    },
    treeItem:{
        backgroundColor: colors.grey[400],
    }
}));

const AnalysisManagement = () => {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.createNewQuery}>
                <RoundedButton
                    className={classes.createNewQueryButton}
                    color="primary"
                    variant="contained"
                    onClick={()=>setOpenDialog(true)}
                    size={'large'}
                    startIcon={<AddIcon size='large'/>}>
                    <Typography variant={'h5'}
                                style={{paddingTop: 6, paddingBottom:6, paddingLeft: 12, paddingRight: 12, color: "white"}}>
                        添加新查询
                    </Typography>
                </RoundedButton >
            </div>
            <div className={classes.content}>
                <QueryTreeView/>
            </div>
            <QuerySelectionDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
            />
        </div>
    )
};

function QueryTreeView() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const expandedNodeList =  useSelector(state=>state.metaInfo.expandedNodeList);
    const selectedQuery =  useSelector(state=>state.metaInfo.selectedQuery);
    const metaInfoMap = useSelector(state=>state.metaInfo.metaInfoMap);
    const [groupMap, individualMap] = metaInfoMapSplit(metaInfoMap);
    const individualIDList = Object.keys(individualMap).sort();

    return (
        <TreeView
            className={classes.treeView}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            expanded={expandedNodeList.map(item=>item.toString())}
            defaultEndIcon={<div style={{ width: 24 }}/>}
            onNodeToggle={(event, nodes)=>(dispatch(setExpandedQueryList(nodes)))}
        >
            <GroupAnalysisList 
                groupMap={groupMap} 
                selectedQuery={selectedQuery}
                metaInfoMap={metaInfoMap}
                setDeleteDialogVisible={setDeleteDialogVisible}
            />
            <IndividualAnalysisList
                individualIDList={individualIDList}
                metaInfoMap={metaInfoMap}
                selectedQuery={selectedQuery}
                setDeleteDialogVisible={setDeleteDialogVisible}
            />
            <DeleteDialog
                deleteDialogVisible={deleteDialogVisible}
                setDeleteDialogVisible={setDeleteDialogVisible}
                selectedQuery={selectedQuery}
            />
        </TreeView>
    );
}

const IndividualAnalysisList = ({individualIDList, selectedQuery, metaInfoMap, setDeleteDialogVisible}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.INDIVIDUAL_ANALYSIS;
    return (
        <TreeItem style={{paddingTop: 16}} nodeId={ParaName.INDIVIDUAL_ANALYSIS} label={
            <Typography variant="h5" color="inherit">
                个体分析
            </Typography>
        }>
            {
                individualIDList.map(id=>(
                    <TreeItem
                        key={id}
                        nodeId={id}
                        onClick={()=>{
                            dispatch(setSelectedQuery(id));
                            history.push(path+"/"+id)
                        }}
                        classes={selectedQuery===id?{content:classes.treeItem}:null}
                        label={
                            <div 
                                className={classes.itemContent}
                            >
                                <DoubleClickToEdit
                                    defaultValue={metaInfoMap[id].queryName}
                                    editQuery={(value)=>dispatch(editQueryName(value,id))}
                                />
                                <DeleteIcon
                                    className={classes.hover}
                                    onClick={()=>{
                                        setDeleteDialogVisible(true);
                                        history.push(path+RouteName.BLANK)
                                    }}
                                />
                            </div>
                        }
                    >
                    </TreeItem>
                ))
            }
        </TreeItem>
    )
};

const DoubleClickToEdit =({defaultValue, editQuery})=>{
    // 如果两次点击之间的时间间隔小于250毫秒，判定为双击，可以进行修改
    const classes = useStyles();
    const [value, setValue] = useState(defaultValue);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [firstClickTime, setFirstClickTime] = useState(0);

    const handleClick = ()=>{
        if(firstClickTime===0) {
            // 初始化
            setFirstClickTime(Date.now);
        }
        else{
            const now = Date.now();
            if((now-firstClickTime)<250){
                setDialogOpen(true)
            }
            setFirstClickTime(Date.now);
        }
    };

    const handleChange =(event)=>{
        setValue(event.target.value)
    };
    return(
        <Fragment>
            <Typography className={classes.hover} onClick={handleClick} variant="h6" color="inherit">
                {defaultValue}
            </Typography>
            <Dialog open={isDialogOpen}>
                <DialogContent>
                    <DialogActions>
                        <TextField
                            id={'editQuery'}
                            label={"修改查询名称"}
                            type={"text"}
                            onChange={handleChange}
                            value={value}
                        />
                        <Button onClick={()=>setDialogOpen(false)} color="primary">
                            取消
                        </Button>
                        <Button
                            onClick={()=>{
                                editQuery(value);
                                setDialogOpen(false)
                            }}
                            color="primary"
                            disabled={value.length === 0}
                            autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
};

const DeleteDialog = ({deleteDialogVisible, setDeleteDialogVisible, selectedQuery})=>{
    const dispatch = useDispatch();
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS;
    const history = useHistory();

    const handleConfirm =()=>{
        setDeleteDialogVisible(false);
        dispatch(deleteQuery(selectedQuery));
        dispatch(unifiedIdAndBasicInfoDelete(selectedQuery));
        dispatch(orderDelete(selectedQuery));
        dispatch(trajectoryDelete(selectedQuery));
        dispatch(labTestDelete(selectedQuery));
        dispatch(vitalSignDelete(selectedQuery));
        dispatch(examDelete(selectedQuery));
        dispatch(modelDeleteAll(selectedQuery));

        history.push(path+RouteName.BLANK)
    };

    return (
        <Dialog open={deleteDialogVisible}>
            <DialogTitle>删除当前查询页</DialogTitle>
            <DialogContent>
                <DialogActions>
                    <Button onClick={()=>setDeleteDialogVisible(false)} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
};

const GroupAnalysisList = ({groupMap, selectedQuery, setDeleteDialogVisible, metaInfoMap})=>{
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const rootNode =  createNestedStructure(groupMap);
    const path = RouteName.MAIN_PAGE+RouteName.ANALYSIS+RouteName.GROUP_ANALYSIS;

    // 由于群体分析会产生树形嵌套结构，需要使用递归才能实现
    const generateTreeMap = (node) =>{
        const id = node.id;
        const idStr = id.toString();
        return (
            <TreeItem
                key={idStr}
                nodeId={idStr}
                classes={selectedQuery===idStr?{content:classes.treeItem}:null}
                onClick={()=>{
                    dispatch(setSelectedQuery(idStr));
                    history.push(path+"/"+idStr)
                }}
                label={
                <div 
                    className={classes.itemContent}
                >
                    <DoubleClickToEdit
                        defaultValue={metaInfoMap[id].queryName}
                        editQuery={(value)=>dispatch(editQueryName(value,id))}
                    />
                    <DeleteIcon
                        className={classes.hover}
                        onClick={()=>{
                            setDeleteDialogVisible(true)
                        }}
                    />
                </div>

            }
            >
                {
                    node['isLeaf']? null:
                        node['childNodes'].map(childNode=>(generateTreeMap(childNode)))
                }
            </TreeItem>
        )
    };

    return (
        <TreeItem style={{paddingTop: 16}} nodeId={ParaName.GROUP_ANALYSIS} label={
            <Typography variant="h5" color="inherit">
                群体分析
            </Typography>
        }>
            {
                rootNode['isLeaf']? null:
                    rootNode['childNodes'].map(node=>(generateTreeMap(node)))
            }
        </TreeItem>
    )
};

const metaInfoMapSplit = (metaInfoMap) => {
    // 将metaInfoMap中混杂在一起的个体分析和群体分析MateInfo拆分成两个单独的部分
    let individualMap = {};
    let groupMap = {};

    for(let id in metaInfoMap){
        if(!metaInfoMap.hasOwnProperty(id))
            continue;

        const metaInfo = metaInfoMap[id];
        if(metaInfo.queryType===ParaName.GROUP_ANALYSIS){
            groupMap[id] = metaInfo
        }
        else if(metaInfo.queryType===ParaName.INDIVIDUAL_ANALYSIS){
            individualMap[id] = metaInfo
        }
    }
    return [groupMap, individualMap]
};


const createNestedStructure = (groupQueryMap) => {
    // 按照设计要求，群体分析要以嵌套（Nested）结构组织，因此我们要从Reducer中还原这种数据结构
    // 具体形式是把数组形式的Group ID重组为一个树形结构，然后按照这个树形结构创建TreeView
    // 本算法的时间复杂度是 O^2，由于我们的query撑死了几十个，因此O^2复杂度是可以接受的
    let queryList = [];
    for(const id in groupQueryMap){
        if(!groupQueryMap.hasOwnProperty(id))
            continue;
        const singleQuery = groupQueryMap[id];
        queryList.push([parseInt(id), singleQuery['queryName'], singleQuery['affiliated']])
    }

    // 根据设计，查询ID是单调递增的，子查询的ID号一定比父查询的ID号大，因此我们先做排序，从前往后遍历
    queryList.sort(function(a, b){return a[0] - b[0]});

    // 构建树形结构，我们以后可以使用BFS或者DFS替代当前的这种算法
    const rootNode = {id: -1, nodeName: 'root', "isLeaf": true, parentNodeID: null, childNodes: null};
    const nodeList = [rootNode];

    for(const item of queryList){
        const node = {id: item[0], nodeName: item[1], "isLeaf": true, parentNodeID: item[2], childNodes: null};
        nodeList.push(node);
        insertIntoTree(node, rootNode, nodeList)
    }
    return rootNode;
};

function insertIntoTree(newNode, rootNode, nodeList){
    const parentNodeID = newNode['parentNodeID'];
    if(parentNodeID===null){
        if (rootNode['childNodes'] === null)
            rootNode['childNodes'] = [];
        rootNode['childNodes'].push(newNode);
        rootNode['isLeaf']=false;
    }
    else {
        for (const item of nodeList) {
            if (item['id'] === parentNodeID) {
                if (item['childNodes'] === null)
                    item['childNodes'] = [];
                item['childNodes'].push(newNode);
                item['isLeaf']=false
            }
        }
    }
}

const RoundedButton = withStyles({
    root: {
        borderRadius: 15
    },
})(Button);



export default AnalysisManagement;