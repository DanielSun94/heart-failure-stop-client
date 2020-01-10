import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {
    withStyles,
    colors
} from "@material-ui/core";

export const ExpansionPanel = withStyles({
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

export const ExpansionPanelSummaryExpandNotSwell = withStyles({
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
        display: 'flex',
        alignmentItems: 'center',
        padding: "0 16px 0 16px",
        '&$expanded': {
            height: 44,
            minHeight: 44,
        },
    },
    content: {
        display: 'flex',
        alignmentItems: 'center',
        margin: "0px 0px 0px 0px"
    },
    expanded: {
        minHeight: 44,
    },
})(MuiExpansionPanelSummary);

export const ExpansionPanelSummary = withStyles({
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

export const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)
    },
}))(MuiExpansionPanelDetails);
