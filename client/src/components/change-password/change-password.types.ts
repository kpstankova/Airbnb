import * as Yup from 'yup'
import { PASSWORD_REGEX } from '../register/register.types';

export interface ChnagePasswordProps {
    toggleChangePasswordModal: boolean;
    resetTogglesModalAction: () => void;
}

export const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old password is required').matches(
        PASSWORD_REGEX,
        "Field requires at least 8 Characters, one Uppercase letter, one Number and one special case Character"
    ),
    newPassword: Yup.string().required('New Password is required').matches(
        PASSWORD_REGEX,
        "Field requires at least 8 Characters, one Uppercase letter, one Number and one special case Character"
    ).when("oldPassword", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().notOneOf(
            [Yup.ref("oldPassword")],
            "The passwords must not be the same"
        )
    })
});