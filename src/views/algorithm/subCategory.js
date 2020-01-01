import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    colors
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";


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


const SubCategory = ({selectedAlgorithmSubCategory, algorithmList, user, setAlgorithmSubCategory}) => {
    const classes = useStyles();

    const handleListItemClick = (event, name) => {
        setAlgorithmSubCategory(name);
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