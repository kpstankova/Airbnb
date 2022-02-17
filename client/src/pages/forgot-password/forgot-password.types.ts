import { makeStyles } from "@material-ui/core";

export const forgotPassword = makeStyles(()=> ({
    buttonRoot:{
        '&:hover': {
            color: 'black',
            boxShadow: '0 14px 9px 0 rgba(0,0,0,0.24), 0 15px 22px rgba(0,0,0,0.19)',
            backgroundColor: 'rgb(189, 30, 89)'
        }
    },
    formControlRoot:{
        width: '80%',
        marginTop: '5px',
        color: 'grey',
        marginLeft: '15px',
        "&:focus": {
            color: "rgb(189, 30, 89)"
        },
        '&:after': {
            borderBottom: '2px solid rgb(12, 175, 149)'
        }
    },
    errors:{
        color: 'red',
        fontSize: '10px',
        width: '240px'
    }
}))