
import { createAction, createReducer, on } from '@ngrx/store';

export const UserReducer = createReducer(
  { maskUserName: false },
  on(createAction('[User] Toggle Mask Username'), state => {
    console.log('old mask username state: ', JSON.stringify(state))
    return {
      ...state,
      maskUserName : !state.maskUserName
    };
  })
);
