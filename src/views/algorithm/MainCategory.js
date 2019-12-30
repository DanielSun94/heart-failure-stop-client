import React from 'react';
import {
    withStyles,
    Typography,
    List,
    ListItem,
    colors
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%'
    },
    listItem: {
        width: '100%'
    },
    expansionPanelList: {
        height: '100%',
        backgroundColor: 'white',
        overflow: 'auto',
    }
}));

const ExpansionPanel = withStyles({
    root: {
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: '#F4F6F8',
        borderTopStyle: 'solid',
        borderTopWidth: 1,
        borderTopColor: colors.grey[200],
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: colors.grey[200],
        marginTop: -1,
        height: 44,
        '&$expanded': {
            height: 44,
        },
    },
    content: {
        '&$expanded': {
            marginTop: '8px',
            marginBottom: '8px'
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)

    },
}))(MuiExpansionPanelDetails);

const Panel = ({pId, pTitle, expandPanel, setExpandPanel, algorithmList, selectedAlgorithm, setSelectedAlgorithm}) => {
    const classes = useStyles();
    const handleChange = id => (event, isExpanded) => {setExpandPanel(id)};
    const handleListItemClick = (event, item) => {setSelectedAlgorithm(item)};
    return (
        <ExpansionPanel
            square
            expanded={expandPanel === pId}
            onChange={handleChange(pId)}>
            <ExpansionPanelSummary id={pId+'-summary'}>
                <Typography>{pTitle}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List
                    className={classes.list}
                >
                    {algorithmList.map(item=>
                        <ListItem
                            className={classes.listItem}
                            button
                            selected={selectedAlgorithm === item}
                            onClick={event => handleListItemClick(event, item)}
                        >
                            {item}
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const MainCategory =({expandPanel, setExpandPanel, selectedAlgorithm, setSelectedAlgorithm}) => {
    const classes = useStyles();

    return (
        <div className={classes.expansionPanelList}>
            <Panel
                pId={'progressionAnalysis'}
                pTitle={'演变过程'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法1', '算法2']}
            />
            <Panel
                pId={'riskAssessment'}
                pTitle={'风险分析'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法3', '算法4']}
            />
            <Panel
                pId={'survivalAnalysis'}
                pTitle={'生存分析'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法5', '算法6']}
            />
            <Panel
                pId={'treatmentRecommendation'}
                pTitle={'干预推荐'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法7', '算法8', '算法7', '算法8', '算法7', '算法8', '算法7', '算法8','算法7', '算法8','算法7', '算法8',
                    '算法8','算法7', '算法8']}
            />
            <Panel
                pId={'treatmentComparison'}
                pTitle={'干预比较'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法9', '算法10']}
            />
            <Panel
                pId={'dataImputation'}
                pTitle={'数据插补'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={['算法11', '算法12']}
            />
        </div>
    )
};


export default MainCategory;