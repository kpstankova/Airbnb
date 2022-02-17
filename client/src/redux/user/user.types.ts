export enum UserActionTypes {
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILED = 'REGISTER_FAILED',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    LOGOUT_SUCESS = 'LOGOUT_SUCESS',
    LOGOUT_FAILED = 'LOGOUT_FAILED',
    SET_USER_UID = 'SET_USER_UID'
}

export interface UserState {
    registeredUser: boolean;
    authenticatedUser: boolean;
    currentUser: User;
    uid: string;
}

export interface RegisterState {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginState {
    email: string;
    password: string;
}

export interface User {
    id?: number;
    email: string;
}