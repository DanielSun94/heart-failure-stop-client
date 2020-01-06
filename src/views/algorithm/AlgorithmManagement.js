import React, {
    useState,
    useEffect
} from 'react';
import {
    Button,
    colors,
    Typography
} from '@material-ui/core';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MainCategory from './MainCategory'
import SubCategory from './SubCategory'
import UpdateModelContent from './Content/ModelUpdate/UpdateModelContent'
import {makeStyles} from "@material-ui/styles";
import {fetchModelListPosts} from "../../actions/algorithmManagementAction";
import CreateNewModel from "./Content/ModelCreate/CreateNewModelContent";

export const MODEL_CATEGORY_PROGRESSION_ANALYSIS = "progressionAnalysis";
export const MODEL_CATEGORY_RISK_ASSESSMENT = "riskAssessment";
export const MODEL_CATEGORY_SURVIVAL_ANALYSIS = "survivalAnalysis";
export const MODEL_CATEGORY_TREATMENT_RECOMMENDATION = "treatmentRecommendation";
export const MODEL_CATEGORY_TREATMENT_COMPARISION = "treatmentComparison";
export const MODEL_CATEGORY_DATA_IMPUTATION = "dataImputation";

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white'
    },
    algorithmSelect:{
        height: "100%",
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    category: {
        height: '95%',
        width: "50%",
        backgroundColor: 'white',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    addAlgorithm: {
        height: "5%",
        width: '100%',
        borderTopWidth: 1,
    },
    title:{
        height: '4%',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    categoryList: {
        height: '91%',
        width: '50%',
        borderRightColor: colors.grey[200],
        borderRightStyle: 'solid',
        borderRightWidth: 1
    },
    content: {
        height: "100%",
        width: '80%',
    },
    button: {
        height: "100%",
        width: '100%'
    },
    nullContainer: {
        display:'flex',
        height:'100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const algorithmTransfer= res =>{
    let algorithmMap = new Map();
    for(let item of res){
        const user = item['createUser'];
        const mainCategory = item['mainCategory'];
        const modelChineseName = item['modelChineseName'];
        const modelEnglishName = item['modelEnglishName'];
        const modelChineseFunctionName = item['modelChineseFunctionName'];
        const modelEnglishFunctionName = item['modelEnglishFunctionName'];
        const platform = item['platform'];
        const accessControl = item['accessControl'];
        const createTime = item['createTime'];
        const lastUpdateTime = item['lastUpdateTime'];

        if(!algorithmMap.has(mainCategory))
            algorithmMap.set(mainCategory, new Map());
        if(!algorithmMap.get(mainCategory).has(modelEnglishName))
            algorithmMap.get(mainCategory).set(modelEnglishName, [modelChineseName, new Map()]);
        algorithmMap.get(mainCategory).get(modelEnglishName)[1].set(
            modelEnglishFunctionName,
            {
                user:user, modelChineseFunctionName: modelChineseFunctionName,
                platform: platform, accessControl: accessControl, createTime: createTime,
                lastUpdateTime: lastUpdateTime
            })
    }
    return algorithmMap
};

const SquareButton = withStyles({
    root: {
        borderRadius: 0,
    },
})(Button);

const constructAlgorithmSubList = (selectedMainCategory, selectedAlgorithmMainCategory, algorithmMap) => {
    let algorithmSubList= [];
    if(selectedMainCategory!=="NotSelected"&&selectedAlgorithmMainCategory!=="NotSelected"
        &&selectedAlgorithmMainCategory!=="noModel"){
        const algorithmSubKeyList = Array.from(algorithmMap.get(selectedMainCategory).get(selectedAlgorithmMainCategory)[1].keys());
        for(let item of algorithmSubKeyList){
            const modelInfo = algorithmMap.get(selectedMainCategory).get(selectedAlgorithmMainCategory)[1].get(item);
            algorithmSubList.push([modelInfo.modelChineseFunctionName, item])
        }
    }
    return algorithmSubList;
};

const AlgorithmManagement = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // 目前仅支持到这一程度，以后可以使用WebSocket技术更改，使得算法数据库更新时，后端可以通知前端
    // 这样就不用重新打开界面才能看到新载入的数据了
    useEffect(()=>{
        dispatch(fetchModelListPosts())
    }, [dispatch]);

    const algorithmList = useSelector(state=>state.algorithm.algorithmList);
    const algorithmMap = algorithmTransfer(algorithmList);

    // create or upload
    const [pageType, setPageType] = useState("update");
    const [blockAlgorithmChange, setBlockAlgorithmChange] = useState(false);
    const [selectedMainCategory, setMainCategory] = useState('NotSelected');
    const [selectedAlgorithmMainCategory, setAlgorithmMainCategory] = useState('NotSelected');
    const [selectedAlgorithmSubCategory, setAlgorithmSubCategory] = useState('NotSelected');

    const algorithmSubList= constructAlgorithmSubList(selectedMainCategory, selectedAlgorithmMainCategory, algorithmMap);

    const changeToCreatePage = ()=>{
        setPageType("create");
        setBlockAlgorithmChange(true)
    };
    const changeToUpdatePage = ()=>{
        setPageType("update");
        setBlockAlgorithmChange(false)
    };

    let content;
    if(pageType==="create")(
        content = <CreateNewModel
            changeToUpdatePage={changeToUpdatePage} setBlockAlgorithmChange={setBlockAlgorithmChange}
        />
    );
    else if(pageType==="update"){
        if(selectedMainCategory !== "NotSelected"
            && selectedAlgorithmMainCategory !== "NotSelected"
            && selectedAlgorithmSubCategory !== "NotSelected") {
            content = (<UpdateModelContent
                selectedMainCategory={selectedMainCategory}
                selectedAlgorithmMainCategory={selectedAlgorithmMainCategory}
                selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                setMainCategory={setMainCategory}
                setAlgorithmMainCategory={setAlgorithmMainCategory}
                setAlgorithmSubCategory={setAlgorithmSubCategory}
            />)
        }
        else{
            content = (
                <div className={classes.nullContainer}>
                    <Typography variant={'h4'}>
                        请选择算法
                    </Typography>
                </div>
            )
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.algorithmSelect}>
                <div className={classes.title}>
                    <Typography variant="h5">
                        算法类型
                    </Typography>
                </div>
                <div className={classes.title}>
                    <Typography variant="h5">
                        具体功能
                    </Typography>
                </div>
                <div className={classes.categoryList}>
                    <MainCategory
                        expandPanel={selectedMainCategory}
                        setExpandPanel={setMainCategory}
                        selectedAlgorithm={selectedAlgorithmMainCategory}
                        setSelectedAlgorithm={setAlgorithmMainCategory}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                        algorithmMap={algorithmMap}
                        block={blockAlgorithmChange}
                    />
                </div>
                <div className={classes.categoryList}>
                    <SubCategory
                        selectedMainCategory={selectedMainCategory}
                        selectedAlgorithmMainCategory={selectedAlgorithmMainCategory}
                        selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmList={algorithmSubList}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                        block={blockAlgorithmChange}

                    />
                </div>
                <div className={classes.addAlgorithm}>
                    <SquareButton
                        variant="contained"
                        color="primary"
                        disabled={blockAlgorithmChange}
                        className={classes.button}
                        onClick={changeToCreatePage}
                    >
                        添加新算法
                    </SquareButton>
                </div>
            </div>
            <div className={classes.content}>
                {content}
            </div>
        </div>
    )
};

export default AlgorithmManagement