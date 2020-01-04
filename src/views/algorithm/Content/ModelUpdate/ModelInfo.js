import React from "react";
import {makeStyles} from "@material-ui/styles";
import {Typography, TextField} from "@material-ui/core";
import {monthAndDateAndTimeTrans} from "../../../../utils/queryUtilFunction";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
    },
    createUser: {
        height: '8%',
        width: '100%',
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    mainCategory: {
        height: '8%',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    modelChineseName: {
        height: '8%',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    modelEnglishName: {
        height: '8%',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    modelChineseFunctionName: {
        height: '8%',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    modelEnglishFunctionName: {
        height: '8%',
        width: '100%',
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    createTime: {
        height: "8%",
        width: "100%",
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
    note: {
        height: "8%",
        width: "100%",
        paddingTop: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start'
    },
}));

const ModelInfo = ({modelInfo})=>{
    const classes = useStyles();

    const createUser = modelInfo['createUser'];
    const mainCategory = modelInfo['mainCategory'];
    const modelChineseName = modelInfo['modelChineseName'];
    const modelEnglishName = modelInfo['modelEnglishName'];
    const modelChineseFunctionName = modelInfo['modelChineseFunctionName'];
    const modelEnglishFunctionName = modelInfo['modelEnglishFunctionName'];
    const createTime = modelInfo['createTime'];
  return (
      <div className={classes.root}>
          <div className={classes.createUser}>
              <Typography variant="h5">
                  创建用户：
              </Typography>
              <TextField disabled={true} label={createUser} />
          </div>
          <div className={classes.mainCategory}>
              <Typography variant="h5">
                  算法类型：
              </Typography>
              <TextField disabled={true} label={mainCategory} />
          </div>
          <div className={classes.modelChineseName}>
              <Typography variant="h5">
                  模型名称（中文名）：
              </Typography>
              <TextField disabled={true} label={modelChineseName} />
          </div>
          <div className={classes.modelEnglishName}>
              <Typography variant="h5">
                  模型名称（英文名）：
              </Typography>
              <TextField disabled={true} label={modelEnglishName} />
          </div>
          <div className={classes.modelChineseFunctionName}>
              <Typography variant="h5">
                  模型功能（中文名）：
              </Typography>
              <TextField disabled={true} label={modelChineseFunctionName} />
          </div>
          <div className={classes.modelEnglishFunctionName}>
              <Typography variant="h5">
                  模型功能（英文名）：
              </Typography>
              <TextField disabled={true} label={modelEnglishFunctionName} />
          </div>
          <div className={classes.createTime}>
              <Typography variant="h5">
                  创建时间：
              </Typography>
              <TextField disabled={true} label={monthAndDateAndTimeTrans(createTime)} />
          </div>
          <div className={classes.note}>
              <Typography variant="h6">
                  本栏所示模型信息不可修改
              </Typography>
          </div>
      </div>
  )
};

export default ModelInfo;