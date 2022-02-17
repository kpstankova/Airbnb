import { makeStyles } from "@material-ui/core";
import * as Yup from 'yup'
import { PASSWORD_REGEX } from "../../components/register/register.types";

export interface ForgotPasswordProps {
    routeParams: any;
    redirectToHome: () => void;
}

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
}));

export const validationSchema = Yup.object({
    password: Yup.string().required('Password is required').matches(
        PASSWORD_REGEX,
        "Field requires at least 8 Characters, one Uppercase letter, one Number and one special case Character"
    ),
    confirmPassword: Yup.string().required('Confirm Password is required').when("password", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
            [Yup.ref("password")],
            "The password must be the same"
        )
    })
});