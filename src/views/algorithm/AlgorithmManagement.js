import React, {useState} from 'react';
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
import Content from './Content'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
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

const SquareButton = withStyles({
    root: {
        borderRadius: 0,
    },
})(Button);

const AlgorithmManagement = ({algorithmMap}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state=>state.session.user.userName);

    const [selectedMainCateGory, setMainCateGory] = useState('NotSelected');
    const [selectedAlgorithmMainCategory, setAlgorithmMainCategory] = useState('NotSelected');
    const [selectedAlgorithmSubCategory, setAlgorithmSubCategory] = useState('NotSelected');

    const algorithmList= ['1', '2', '3'];
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
                        expandPanel={selectedMainCateGory}
                        setExpandPanel={setMainCateGory}
                        selectedAlgorithm={selectedAlgorithmMainCategory}
                        setSelectedAlgorithm={setAlgorithmMainCategory}
                    />
                </div>
                <div className={classes.categoryList}>
                    <SubCategory
                        selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                        algorithmList={algorithmList}
                        setAlgorithmSubCategory={setAlgorithmSubCategory}
                    />
                </div>
                <div className={classes.addAlgorithm}>
                    <SquareButton
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        添加新算法
                    </SquareButton>
                </div>
            </div>
            <div className={classes.content}>
                {(  selectedMainCateGory !== "NotSelected"
                    && selectedAlgorithmMainCategory !== "NotSelected"
                    && selectedAlgorithmSubCategory !== "NotSelected"
                )
                    ?
                    <Content
                        selectedMainCateGory={selectedMainCateGory}
                        selectedAlgorithmMainCategory={selectedAlgorithmMainCategory}
                        selectedAlgorithmSubCategory={selectedAlgorithmSubCategory}
                    />
                    :
                    <div className={classes.nullContainer}>
                        <Typography variant={'h4'}>
                            请选择算法
                        </Typography>
                    </div>
                }
            </div>
        </div>
    )
};

export default AlgorithmManagement