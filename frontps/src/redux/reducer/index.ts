// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import { userReducer } from './reducerUser';
import { StoreState } from '../types';



const rootReducer = combineReducers<StoreState>({
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
