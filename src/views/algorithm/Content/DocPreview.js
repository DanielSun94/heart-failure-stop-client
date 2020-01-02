import React from "react";
import ReactMarkdown from "react-markdown";
import {makeStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
    },
    title: {
        marginLeft: theme.spacing(4),
        height: "8%",
        display: 'flex',
        alignItems: 'center'
    },
    preview: {
        marginLeft: theme.spacing(4),
        height: "92%",
        overflow: 'scroll'
    }
}));

const DocPreview = () => {
    const input = '# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n# This is a header\n\n' +
        'And this is a paragraph\n';
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h5">
                    文档预览
                </Typography>
            </div>
            <div className={classes.preview}>
                <ReactMarkdown source={input} />
            </div>
        </div>
    )
};

export default DocPreview;