import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

const initState = {
  initApp: false,
};

const {actions, reducer} = createSlice({
  name: 'constant',
  initialState: initState,
  reducers: {
    setApp: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        initApp: action.payload,
      };
    },
  },
});
const _getStore = (): Store => {
  if (!_store) {
    throw new Error(
      'You need to run setStore right after init store to use this function',
    );
  }

  return _store;
};

export const constantReducer = reducer;

export const getApp = (): boolean => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(state => state.constant.initApp);
};

export const setApp = (isInit: boolean) => {
  return _getStore().dispatch(actions.setApp(isInit));
};

let _store: Store | undefined;

export const setConstantStore = (store: Store) => {
  _store = store;
};
