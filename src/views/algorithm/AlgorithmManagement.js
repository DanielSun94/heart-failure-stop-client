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
    useSelector
} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MainCategory from './MainCategory'
import SubCategory from './SubCategory'
import UpdateModelContent from './Content/ModelUpdate/UpdateModelContent'
import {makeStyles} from "@material-ui/styles";
import CreateNewModel from "./Content/ModelCreate/CreateNewModelContent";
import {
    Switch,
    Route,
    useHistory
} from 'react-router-dom';
import RouteName from "../../utils/RouteName";

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
    const history = useHistory();
    const path = RouteName.MAIN_PAGE+RouteName.ALGORITHM_MANAGEMENT;
    // 算法列表清单的初始化已经在MainPage完成
    const algorithmList = useSelector(state=>state.algorithm.algorithmList);
    const algorithmMap = algorithmTransfer(algorithmList);

    // create or upload
    const [blockAlgorithmChange, setBlockAlgorithmChange] = useState(false);
    const [selectedMainCategory, setMainCategory] = useState('NotSelected');
    const [selectedAlgorithmMainCategory, setAlgorithmMainCategory] = useState('NotSelected');
    const [selectedAlgorithmSubCategory, setAlgorithmSubCategory] = useState('NotSelected');

    useEffect(()=>{
        if(selectedMainCategory !== "NotSelected"
            && selectedAlgorithmMainCategory !== "NotSelected"
            && selectedAlgorithmSubCategory !== "NotSelected") {
            history.push(path + RouteName.UPDATE_ALGORITHM + "/" + selectedMainCategory + "/" +
                selectedAlgorithmMainCategory + "/" + selectedAlgorithmSubCategory);
        }
    }, [selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory]);

    const algorithmSubList= constructAlgorithmSubList(selectedMainCategory, selectedAlgorithmMainCategory, algorithmMap);

    const changeToCreatePage = ()=>{
        history.push(path+RouteName.CREATE_ALGORITHM);
        setBlockAlgorithmChange(true)
    };

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
                <Switch>
                    <Route path={path+RouteName.CREATE_ALGORITHM}>
                        <CreateNewModel setBlockAlgorithmChange={setBlockAlgorithmChange}/>
                    </Route>
                    <Route path={path+RouteName.UPDATE_ALGORITHM+"/:modelCategory/:modelName/:modelFunction"}>
                        <UpdateModelContent
                            setMainCategory={setMainCategory}
                            setAlgorithmMainCategory={setAlgorithmMainCategory}
                            setAlgorithmSubCategory={setAlgorithmSubCategory}
                        />
                    </Route>
                    <Route path={path}>
                        <div className={classes.nullContainer}>
                            <Typography variant={'h4'}>
                                请选择算法
                            </Typography>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    )
};

export default AlgorithmManagement