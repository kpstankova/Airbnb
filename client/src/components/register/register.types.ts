import { User } from "../../redux/user/user.types";
import * as Yup from 'yup'

export interface RegisterModalProps {
    toggleRegisterModal: boolean;
    registerUserSuccessAction: () => void;
    registerUserErrorAction: (data: string) => void;
    resetTogglesModalAction: () => void;
    toggleLoginModalAction: () => void;
    toggleVerificationModalAction: () => void;
    setUserUidAction: (data: string) => void;
    // redirectToOnboarding: () => void;
}

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
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

export const headers = {
    'Content-Type': 'application/json'
}