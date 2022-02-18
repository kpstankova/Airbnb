import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';
import { ModalState } from './modal-visibility/modal.types';
import modalReducer from './modal-visibility/modal.reducer';
import { UserState } from './user/user.types';
import userReducer from './user/user.reducer';
import { OnboardingState } from './onboarding/onboarding.types';
import { onboardingReducer } from './onboarding/onboarding.reducer';
import { SearchState } from './search/search.types';
import { searchBarReducer } from './search/search.reducer';

export interface StoreState {
    router: RouterState & PersistPartial;
    modal: ModalState;
    user: UserState & PersistPartial;
    onboarding: OnboardingState;
    search: SearchState;
};

const routerConfig = {
    key: 'router',
    storage: storage,
    whitelist: ['router']
}

const userConfig = {
    key: 'user',
    storage: storage,
}


export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: persistReducer(routerConfig, connectRouter(history)),
    modal: modalReducer,
    user: persistReducer(userConfig, userReducer),
    onboarding: onboardingReducer,
    search: searchBarReducer
});

export type RootState = ReturnType<typeof rootReducer>;