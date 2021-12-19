import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

export interface StoreState {
    router: RouterState & PersistPartial;
};

const routerConfig = {
    key: 'router',
    storage: storage,
    whitelist: ['router']
}


export const rootReducer = (history: any) => combineReducers<StoreState>({
    router: persistReducer(routerConfig, connectRouter(history))
});

export type RootState = ReturnType<typeof rootReducer>;