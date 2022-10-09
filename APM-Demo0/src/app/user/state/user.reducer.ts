
import { createAction, createFeatureSelector,
         createReducer, createSelector, on } from '@ngrx/store';
import * as UserActions from './user.actions';

export interface IUserState {
  maskUserName: boolean;
}

const initialState: IUserState = {
  maskUserName: false
}

const getUserFeatureState = createFeatureSelector<IUserState>('user');

export const getMaskUserNameState = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const UserReducer = createReducer<IUserState>(
  initialState,
  on(UserActions.toggleMaskUserName, (state): IUserState => {
    // console.log('old mask username state: ', JSON.stringify(state))
    return {
      ...state,
      maskUserName : !state.maskUserName
    };
  })
);
