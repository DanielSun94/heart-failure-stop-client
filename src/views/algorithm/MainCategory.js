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

import {
    MODEL_CATEGORY_DATA_IMPUTATION,
    MODEL_CATEGORY_PROGRESSION_ANALYSIS,
    MODEL_CATEGORY_RISK_ASSESSMENT,
    MODEL_CATEGORY_SURVIVAL_ANALYSIS,
    MODEL_CATEGORY_TREATMENT_COMPARISION,
    MODEL_CATEGORY_TREATMENT_RECOMMENDATION
} from "./AlgorithmManagement"

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
                            selected={selectedAlgorithm === item[0]}
                            onClick={event => handleListItemClick(event, item[0])}
                        >
                            {item[1]}
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const MainCategory =({expandPanel, setExpandPanel, selectedAlgorithm, setSelectedAlgorithm, algorithmMap}) => {
    const classes = useStyles();

    // data prepare
    const subMap = {
        "progressionAnalysis": [],
        "riskAssessment": [],
        "survivalAnalysis": [],
        "treatmentRecommendation": [],
        "treatmentComparison": [],
        "dataImputation": []
    };

    for(let key in subMap){
        if(!algorithmMap.has(key)) {
            subMap[key] = [['noModel', '无模型']];
            continue;
        }
        const modelEnglishNameList = Array.from(algorithmMap.get(key).keys());
        subMap[key] = modelEnglishNameList.map(item=>[item, algorithmMap.get(key).get(item)[0]])
    }

    return (
        <div className={classes.expansionPanelList}>
            <Panel
                pId={MODEL_CATEGORY_PROGRESSION_ANALYSIS}
                pTitle={'演变过程'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_PROGRESSION_ANALYSIS]}
            />
            <Panel
                pId={MODEL_CATEGORY_RISK_ASSESSMENT}
                pTitle={'风险分析'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_RISK_ASSESSMENT]}
            />
            <Panel
                pId={MODEL_CATEGORY_SURVIVAL_ANALYSIS}
                pTitle={'生存分析'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_SURVIVAL_ANALYSIS]}
            />
            <Panel
                pId={MODEL_CATEGORY_TREATMENT_RECOMMENDATION}
                pTitle={'干预推荐'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_TREATMENT_RECOMMENDATION]}
            />
            <Panel
                pId={MODEL_CATEGORY_TREATMENT_COMPARISION}
                pTitle={'干预比较'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_TREATMENT_COMPARISION]}
            />
            <Panel
                pId={MODEL_CATEGORY_DATA_IMPUTATION}
                pTitle={'数据插补'}
                expandPanel={expandPanel}
                setExpandPanel={setExpandPanel}
                selectedAlgorithm={selectedAlgorithm}
                setSelectedAlgorithm={setSelectedAlgorithm}
                algorithmList={subMap[MODEL_CATEGORY_DATA_IMPUTATION]}
            />
        </div>
    )
};


export default MainCategory;