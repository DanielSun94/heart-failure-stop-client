import React, {useState, Fragment, useEffect} from 'react';
import pinyin from 'pinyin'
import {
    colors,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Checkbox
} from '@material-ui/core';
import {diagnosisJson, mainDiagnosisJson} from "../../../../../../utils/diagnosisMap";
import ParaName from "../../../../../../utils/ParaName";
import { makeStyles } from '@material-ui/core/styles';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles(() => ({
    root: {
        width: 1200,
        height: 600,
        display:'flex',
    },
    paperWidthSm: {maxWidth: 1200},
}));

const DiagnosisFilter = ({openDialog, setOpenDialog, addConstraint, editConstraint, index, constraintType,
                             diagnosisType, previousContent}) =>{
    // item = [type, diagnosisCode1, diagnosisCode2, ...]
    // type = {"mainDiagnosis", "diagnosis"}
    const classes = useStyles();

    const [representativeDiagnosisList, cantUse1] = useState([]);
    const [diagnosisList, cantUse2] = useState([]);
    const [codeNameMap, cantUse3] = useState({});
    const [namePinyinMap, cantUse4] = useState({});
    const [legalDiagnosisList, setLegalDiagnosisList] = useState([]);
    const [pinyinCode, setPinyin] = useState('');
    const [selectedDiagnosisList, setSelectedDiagnosisList] = useState(
        previousContent?previousContent.slice(1):[]
    );

    useEffect(()=>{
        const pinyinLowCase = pinyinCode.toLocaleLowerCase();
        const list = [];
        if(pinyinCode===''||pinyinCode==='输入拼音缩写筛选'){
            setLegalDiagnosisList(diagnosisList)
        }
        else{
            for(const item of diagnosisList){
                const itemPinyin = namePinyinMap[item[1]];
                if(itemPinyin.includes(pinyinLowCase)){
                    list.push(item)
                }
            }
            setLegalDiagnosisList(list)
        }
    }, [pinyinCode]);

    useEffect(()=>{
        // 载入数据其实并不是时间瓶颈
        cantUse1(JSON.parse(mainDiagnosisJson()));
        const list = JSON.parse(diagnosisJson());
        cantUse2(list);
        const map = {};
        for(const item of list){
            map[item[0]] = item[1]
        }
        cantUse3(map);
        const pinyinMap = {};
        for(const item of list){
            const firstLetterList = pinyin(item[1], {style: pinyin.STYLE_FIRST_LETTER});
            let firstLetterStr = "";
            for(let strList of firstLetterList)
                firstLetterStr += strList[0];
            firstLetterStr = firstLetterStr.toLowerCase();
            pinyinMap[item[1]]=firstLetterStr
        }
        cantUse4(pinyinMap);
        setPinyin('输入拼音缩写筛选')
    }, []);

    const handleConfirm=()=>{
        if(constraintType==="add"){
            addConstraint([diagnosisType, ...selectedDiagnosisList])
        }
        else if(constraintType==="edit"){
            editConstraint(index, [diagnosisType, ...selectedDiagnosisList])
        }
        setOpenDialog(null)
    };

    return (
        <Dialog
            open={openDialog===diagnosisType}
            maxWidth={'sm'}
            classes={{paperWidthSm: classes.paperWidthSm}}
            disableBackdropClick={true}
        >
            <DialogTitle>
                {diagnosisType===ParaName.DIAGNOSIS&&"诊断过滤器"}
                {diagnosisType===ParaName.MAIN_DIAGNOSIS&&"主要诊断过滤器"}
            </DialogTitle>
            <DialogContent
                className={classes.root}
            >
                <div style={{width: 400, height: 565, overflow: 'auto'}}>
                    <Typography variant={'h5'} style={{marginBottom: 10}}>病人诊断</Typography>
                    {selectedDiagnosisList.map((item, index)=>{
                        const name = codeNameMap[item];
                        return (
                            <Fragment>
                                {index!==0?<Typography>或</Typography>:null}
                                <Typography>{name}</Typography>
                            </Fragment>
                        )
                    })}
                </div>
                <div style={{
                    width: 400,
                    borderRightColor: colors.grey[200],
                    borderRightStyle: 'solid',
                    borderRightWidth: 1,
                    overflow: 'auto'}}>
                    <Typography variant={'h5'} style={{marginLeft: 10}}>本数据库中的高频诊断</Typography>
                    <FixedSizeList
                        height={565}
                        width={565}
                        itemSize={46}
                        itemCount={representativeDiagnosisList.length}
                        itemData={[representativeDiagnosisList, selectedDiagnosisList, setSelectedDiagnosisList]}
                    >
                        {Item}
                    </FixedSizeList>
                </div>
                <div style={{width: 400, overflow: 'auto'}}>
                    <div style={{display: 'flex', marginLeft: 10}}>
                        <Typography variant={'h5'}>全诊断清单</Typography>
                        <input
                            style={{marginLeft: 60, paddingTop:0, paddingBottom:0}}
                            value={pinyinCode}
                            onChange={(event)=>
                                setPinyin(event.target.value)}
                        />
                    </div>
                    <FixedSizeList
                        height={565}
                        width={400}
                        itemSize={46}
                        itemCount={legalDiagnosisList.length}
                        itemData={[legalDiagnosisList, selectedDiagnosisList, setSelectedDiagnosisList]}
                    >
                        {Item}
                    </FixedSizeList>
                </div>
            </DialogContent>
            <DialogActions>
                <div style={{width: "86%"}}>
                    <Typography>
                        本筛选器的诊断与ICD-10编码大类（ICD-10编码前三位）一一对应。使用本筛选器会造成用ICD-9编码的诊断无法被筛选
                    </Typography>
                </div>
                <Button variant={'outlined'}
                        onClick={handleConfirm}
                        color="primary">
                    确认
                </Button>
                <Button variant={'outlined'} onClick={()=>setOpenDialog(null)}>
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    )
};

const Item=({index, data, style})=>{
    // 注意，此处必须使用style参数（并在下面的渲染中使用），不然会出错

    const icdCode = data[0][index][0];
    const name = data[0][index][1];
    const selectedDiagnosisList = data[1];
    const setSelectedDiagnosisList = data[2];

    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        setChecked(false);
        for(const item of selectedDiagnosisList){
            if(item===icdCode){
                setChecked(true);
                break
            }
        }
    }, [selectedDiagnosisList]);

    const handleAdd=()=>{
        const temp = [...selectedDiagnosisList];
        temp.push(icdCode);
        setSelectedDiagnosisList(temp)
    };

    const handleDelete=()=>{
        const temp = [];
        for(const item of selectedDiagnosisList){
            if(item!==icdCode){
                temp.push(item)
            }
        }
        setSelectedDiagnosisList(temp)
    };

    return(
        <div style={{display: 'flex', alignItems: 'center', ...style}}>
            <Checkbox
                value="secondary"
                color="primary"
                checked={checked}
                onChange={(event)=>{
                    const checkStatus = event.target.checked;
                    if(checkStatus){
                        handleAdd()
                    }
                    else{
                        handleDelete()
                    }
                }}
            />
            <Typography>{name}</Typography>
        </div>
    )
};


export default DiagnosisFilter;