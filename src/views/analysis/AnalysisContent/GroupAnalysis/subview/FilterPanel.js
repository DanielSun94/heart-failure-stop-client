import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: '100%',
        display:'flex',
        flexDirection: 'column',
        overflow: 'auto'
    },
}));

const FilterPanel =({queryID, toggleFilter, setToggleFilter}) =>{
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <span style={{paddingTop: 18, paddingLeft: 12}}>过滤器</span>
            <span style={{paddingTop: 18, paddingLeft: 12}}>To Be Done</span>
            <Button
                style={{paddingTop: 18, paddingLeft: 12}}
                color={'primary'}
                onClick={()=>{setToggleFilter(!toggleFilter)}}
            >
                过滤器重设
            </Button>
        </div>)
};

export default FilterPanel;