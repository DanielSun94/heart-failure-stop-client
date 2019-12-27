import React, {
    useState,
    Fragment
} from 'react';
import {
    withStyles,
    Typography,
    List,
    ListItem
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";


const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
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
        backgroundColor: 'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

const Panel = ({pId, pTitle, expandPanel, setExpandPanel, algorithmList, selectedAlgorithm, setSelectedAlgorithm}) => {
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
                <List>
                    {algorithmList.map(item=>
                        <ListItem
                            button
                            selected={selectedAlgorithm === item}
                            onClick={event => handleListItemClick(event, item)}
                        >
                            <Typography>
                                {item}
                            </Typography>
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const useStyles = makeStyles(theme => ({
    mainCategory: {
        display: 'flex',
        height: '100%',
        flexDirection: "column"
    },
    addAlgorithm: {
        height: '5%',
    },
    expansionPanelList: {
        height: '95%',
        backgroundColor: '#FFFFFF',
        overflow: 'auto'
    }
}));

const MainCategory =({expandPanel, setExpandPanel, selectedAlgorithm, setSelectedAlgorithm}) => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.addAlgorithm}>
                <h1>1</h1>
            </div>
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
                    algorithmList={['算法7', '算法8']}
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
        </div>
    )
};


export default MainCategory;