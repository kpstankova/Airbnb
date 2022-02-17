import { makeStyles } from '@material-ui/core';
import * as Yup from 'yup'
import { DroppedFile } from '../../redux/onboarding/onboarding.types';
import { User } from '../../redux/user/user.types';

export interface OnboardingComponentProps {
    currentUser: User;
    profileImage: DroppedFile | null;
    redirectToMainPage: () => void;
}

export const onboardingForm = makeStyles(() => ({
    textFieldRoot: {
        width: '80%',
        marginTop: '20px',
        color: 'grey',
        marginLeft: '15px',
        borderRadius: '0px',
        marginBottom: '5% !important',
        "&:focus": {
            color: "rgb(189, 30, 89)"
        },
        '&:after': {
            borderBottom: '2px solid rgb(189, 30, 89)'
        }
    }
}));

export const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required')
});