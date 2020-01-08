import { makeStyles } from '@material-ui/styles';

// Order, Exam和Vital Sign的布局代码相同，此处共享
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 0,
        height: 470,
    },
    bigViewContainer: {
        padding: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    smallViewContainer:{
        padding: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
    },
    list: {
        width: 230,
        flexBasis: 230,
        flexShrink: 0,
        '@media (min-width: 864px)': {
            borderRight: `1px solid ${theme.palette.divider}`
        }
    },
    smallViewHead:{
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderBottomColor: '#f8f8f8',
        borderBottomStyle: "solid"
    },
    loading:{
        height: "100%",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
    }
}));

export default useStyles;