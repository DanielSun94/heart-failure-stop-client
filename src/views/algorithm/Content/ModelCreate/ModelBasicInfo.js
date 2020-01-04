import React, {useState} from "react";
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/styles";
import {FormControl, MenuItem, Select, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
    },
    itemGroup:{
        width: '100%',
        height: "70%",
    },
    nextStepGroup:{
        width: '100%',
        height: "10%",
        marginBottom: theme.spacing(3)
    },
    item: {
        width: '100%',
        height: "7%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        marginTop: theme.spacing(3)
    },
    itemLabel: {
        width: '15%',
        height: "100%",
    },
    itemContent: {
        width: '15%',
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    itemContentDetail: {
        width: '100%',
    },
    submitPanel: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));


const ModelBasicInfo = ({jumpNext, setModelNameMap, modelNameMap})=>{
    const classes = useStyles();
    const algorithmList = useSelector(state=>state.algorithm.algorithmList);

    const [platform, setPlatform] = useState(modelNameMap['platform']);
    const [modelCategory, setModelCategory] = useState(modelNameMap['modelCategory']);
    const [modelChineseName, setModelChineseName] = useState(modelNameMap['modelChineseName']);
    const [modelEnglishName, setModelEnglishName] = useState(modelNameMap['modelEnglishName']);
    const [modelEnglishFunction, setModelEnglishFunction] = useState(modelNameMap['modelEnglishFunction']);
    const [modelChineseFunction, setModelChineseFunction] = useState(modelNameMap['modelChineseFunction']);

    let nextStepStatus = inputValidCheck(modelCategory, modelChineseName, modelEnglishName,
        modelEnglishFunction, modelChineseFunction, algorithmList, platform);

    const handleNext = () =>{
        setModelNameMap({
            'platform': platform,
            'modelCategory': modelCategory,
            'modelChineseName': modelChineseName,
            'modelEnglishName': modelEnglishName,
            'modelEnglishFunction': modelEnglishFunction,
            'modelChineseFunction': modelChineseFunction,
        });
        jumpNext();
    };

    return (
        <div className={classes.root}>
            <div className={classes.itemGroup}>
                <ModelCategory
                    setModelEnglishCategory={setModelCategory}
                />
                <AlgorithmChineseName
                    algorithmChineseName={modelChineseName}
                    setAlgorithmChineseName={setModelChineseName}
                />
                <AlgorithmEnglishName
                    algorithmEnglishName={modelEnglishName}
                    setAlgorithmEnglishName={setModelEnglishName}
                />
                <AlgorithmFunctionChineseName
                    chineseFunctionName={modelChineseFunction}
                    setChineseFunctionName={setModelChineseFunction}
                />
                <AlgorithmFunctionEnglishName
                    englishFunctionName={modelEnglishFunction}
                    setEnglishFunctionName={setModelEnglishFunction}
                />
                <AlgorithmPlatform
                    selectedPlatform={platform}
                    setPlatform={setPlatform}
                />
            </div>
            <div className={classes.nextStepGroup}>
                <SubmitPanel
                    handleNext={handleNext}
                    nextStepStatus={nextStepStatus}
                />

            </div>
        </div>
    )
};

const SubmitPanel = ({handleNext, nextStepStatus})=>{
    const classes = useStyles();

    let comment="";
    if(!nextStepStatus)
        comment+="输入存在错误，请修改";

    return (
        <div className={classes.submitPanel}>
            <Typography variant="h6">
                {comment}
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleNext}
                disabled={!nextStepStatus}
            >
                下一步
            </Button>
        </div>
    )
};

const inputValidCheck = (modelCategory, modelChineseName, modelEnglishName, modelEnglishFunction, modelChineseFunction,
                         algorithmList, platform)=>{
    // 当既有数据
    if(modelChineseName.length===0 || modelEnglishName.length===0 || modelEnglishFunction.length===0||
        modelChineseFunction.length===0 || platform.length===0 || modelCategory.length===0)
        return false;

    let valid = true;

    for(let item of algorithmList){
        const itemMainCategory = item['mainCategory'];
        const itemModelChineseName = item['modelChineseName'];
        const itemModelEnglishName = item['modelEnglishName'];
        const itemModelEnglishFunction = item['modelEnglishFunction'];
        const itemModelChineseFunction = item['modelChineseFunction'];
        if(itemMainCategory===modelCategory&&itemModelChineseName===modelChineseName&&
            modelChineseFunction===itemModelChineseFunction)
            valid=false;
        if(itemMainCategory===modelCategory&&itemModelEnglishName===modelEnglishName&&
            modelEnglishFunction===itemModelEnglishFunction)
            valid=false;
    }
    return valid;
};

const ModelCategory = ({setModelEnglishCategory})=>{
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const platformList = ['演变过程', "风险分析", '生存分析', '干预推荐', '干预比较', '数据插补'];

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = event => {
        const category = event.target.value;
        let modelCategoryEnglish;
        switch (category) {
            case '演变过程': modelCategoryEnglish="progressionAnalysis";break;
            case '风险分析': modelCategoryEnglish="riskAssessment";break;
            case '生存分析': modelCategoryEnglish="survivalAnalysis";break;
            case '干预推荐': modelCategoryEnglish="treatmentRecommendation";break;
            case '干预比较': modelCategoryEnglish="treatmentComparison";break;
            case '数据插补': modelCategoryEnglish="dataImputation";break;
            default: modelCategoryEnglish="progressionAnalysis";break;
        }
        setModelEnglishCategory(modelCategoryEnglish);
    };

    return (
        <div className={classes.item}>
            <Typography className={classes.itemLabel} variant="h5">
                模型类型
            </Typography>
            <div className={classes.itemContent}>
                <FormControl className={classes.itemContentDetail}>
                    <Select open={open} onClose={handleClose} onOpen={handleOpen} onChange={handleChange}>
                        {
                            platformList.map(item=>
                                <MenuItem key={item} value={item}>{item}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
};

const AlgorithmChineseName = ({setAlgorithmChineseName, algorithmChineseName})=>{
    const classes = useStyles();
    const changeHandler = (event)=>{setAlgorithmChineseName(event.target.value)};
    return (
        <div className={classes.item}>
            <Typography className={classes.itemLabel} variant="h5">
                模型名称（中文）：
            </Typography>
            <div className={classes.itemContent}>
                <TextField className={classes.itemContentDetail} label={""}
                           value={algorithmChineseName} onChange={(changeHandler)}/>
            </div>
        </div>
    )
};

const AlgorithmEnglishName = ({setAlgorithmEnglishName, algorithmEnglishName})=>{
    const classes = useStyles();
    const changeHandler = (event)=>{setAlgorithmEnglishName(event.target.value)};
    return (
        <div className={classes.item}>
            <Typography className={classes.itemLabel} variant="h5">
                模型名称（英文）：
            </Typography>
            <div className={classes.itemContent}>
                <TextField className={classes.itemContentDetail} label={""}
                           value={algorithmEnglishName} onChange={(changeHandler)}/>
            </div>
        </div>
    )
};

const AlgorithmFunctionChineseName = ({setChineseFunctionName, chineseFunctionName})=>{
    const classes = useStyles();
    const changeHandler = (event)=>{setChineseFunctionName(event.target.value)};
    return (
        <div className={classes.item}>
            <Typography className={classes.itemLabel} variant="h5">
                模型功能（中文）：
            </Typography>
            <div className={classes.itemContent}>
                <TextField className={classes.itemContentDetail} label={""}
                           value={chineseFunctionName} onChange={(changeHandler)}/>
            </div>
        </div>
    )
};

const AlgorithmFunctionEnglishName = ({setEnglishFunctionName, englishFunctionName})=>{
    const classes = useStyles();
    const changeHandler = (event)=>{setEnglishFunctionName(event.target.value)};
    return (
        <div className={classes.item}>
            <Typography className={classes.itemLabel} variant="h5">
                模型功能（英文）：
            </Typography>
            <div className={classes.itemContent}>
                <TextField className={classes.itemContentDetail} label={""}
                           value={englishFunctionName} onChange={(changeHandler)}/>
            </div>
        </div>
    )
};

const AlgorithmPlatform = ({setPlatform, selectedPlatform})=>{
    const platformList = ['Tensorflow', "Pytorch", 'Sklearn'];
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleChange = event => {
        const newPlatform = event.target.value;
        setPlatform(newPlatform);
    };

    return (
        <div className={classes.item}>
            <Typography
                className={classes.itemLabel}
                variant="h5">
                模型平台：
            </Typography>
            <div className={classes.itemContent}>
                <FormControl className={classes.itemContentDetail}>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedPlatform}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            platformList.map(item=>
                                <MenuItem
                                    value={item}
                                    key={item}
                                >
                                    {item}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </div>
        </div>
    )
};
export default ModelBasicInfo;