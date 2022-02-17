import * as Yup from 'yup'

export interface ForgotPasswordComponentProps {
    toggleForgotPasswordModal: boolean;
    resetTogglesModalAction: () => void;
    toggleLoginModalAction: () => void;
    toggleRegisterModalAction: () => void;
    setUserUidAction: (data: string) => void;
}

export const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
});