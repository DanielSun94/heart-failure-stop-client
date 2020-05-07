import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    colors
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {useSelector} from "react-redux";


const useStyles = makeStyles(() => ({
    listItem: {
        marginBottom: -1,
        borderTopStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: colors.grey[200],
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: colors.grey[200]
    },
    list: {
        padding: 0
    }
}));


const SubCategory = ({selectedMainCategory, selectedAlgorithmMainCategory, selectedAlgorithmSubCategory,
                         algorithmList, setAlgorithmSubCategory, block}) => {
    const classes = useStyles();

    const currentUser = useSelector(state=>state.session.user.userName);
    const modelCreateUserMap = useSelector(state=>state.algorithm.modelCreateUser);
    const handleListItemClick = (event, name) => {
        setAlgorithmSubCategory(name);
    };

    const blockItem = (item)=>{
        const unifiedName = selectedMainCategory+"_"+selectedAlgorithmMainCategory+"_"+item[1];
        const itemCreateUser = modelCreateUserMap[unifiedName];
        return itemCreateUser===currentUser
    };

    if(!(algorithmList && algorithmList.length > 0)){
        return (
            <List
                component="nav"
                className={classes.list}
            >
                <ListItem
                    className={classes.listItem}
                >
                    <ListItemText primary={"无对应算法"}/>
                </ListItem>
            </List>
        )
    }

    return (
        <List
            component="nav"
            className={classes.list}
        >
            {algorithmList.map(item=>
                <ListItem
                    button
                    key={item[1]}
                    disabled={block||(!blockItem(item))}
                    className={classes.listItem}
                    selected={item[1] === selectedAlgorithmSubCategory}
                    onClick={event => handleListItemClick(event, item[1])}
                >
                    <ListItemText primary={item[0]}/>
                </ListItem>
            )}
        </List>
    )
};


export default SubCategory;
