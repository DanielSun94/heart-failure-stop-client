import React, {useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import AddIcon from '@material-ui/icons/Add';
import {
    colors,
    Typography,
    Button} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {TreeView, TreeItem} from "@material-ui/lab";
        import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {useSelector} from "react-redux";
import ParaName from "../../../utils/ParaName";
import QuerySelectionDialog from "./QuerySelectionDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
    },
    treeView: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
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
        maxHeight: 850,
        backgroundColor: 'white'
    },
    createNewQueryButton: {
        marginBottom:  theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}));

const AnalysisManagement = ({setSelectedQueryID}) => {
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
                    <Typography variant={'h5'} style={{paddingTop: 6, paddingBottom:6, paddingLeft: 12, paddingRight: 12, color: "white"}}>
                        添加新查询
                    </Typography>
                </RoundedButton >
            </div>
            <div className={classes.content}>
                <QueryTreeView
                    setSelectedQueryID={setSelectedQueryID}
                />
            </div>
            <QuerySelectionDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setSelectedQueryID={setSelectedQueryID}
            />
        </div>
    )
};

function QueryTreeView({setSelectedQueryID}) {
    const classes = useStyles();

    const metaInfoMap = useSelector(state=>state.metaInfo.metaInfoMap);
    const [groupMap, individualMap] = metaInfoMapSplit(metaInfoMap);
    const individualIDList = Object.keys(individualMap).sort();

    const rootNode =  createNestedStructure(groupMap);

    const generateTreeMap = (node) =>{
        return (
            <TreeItem
                key={node['id']}
                nodeId={node['id']}
                label={node['nodeName']}
                onClick={()=>setSelectedQueryID(node['id'])}
            >
                {
                    node['isLeaf']? null:
                        node['childNodes'].map(childNode=>(generateTreeMap(childNode)))
                }
            </TreeItem>
        )
    };

    return (
        <TreeView
            className={classes.treeView}
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
        >
            <TreeItem nodeId={ParaName.GROUP_ANALYSIS} label="群体分析">
                {
                    rootNode['isLeaf']? null:
                        rootNode['childNodes'].map(node=>(generateTreeMap(node)))
                }
            </TreeItem>
            <TreeItem nodeId={ParaName.INDIVIDUAL_ANALYSIS} label="个体分析">
                {
                    individualIDList.map(id=>(
                        <TreeItem
                            key={id}
                            nodeId={id}
                            onClick={()=>setSelectedQueryID(id)}
                            label={metaInfoMap[id].queryName}
                        />
                    ))
                }
            </TreeItem>
        </TreeView>
    );
}

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