import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export type DynamicState<T> = {
  info: Record<string, T>;
  accessToken: string;
};

export const createUserReducer = <T extends {[x: string]: any}>(
  mainKey: string,
  initialState: DynamicState<T> = {info: {}, accessToken: ''},
) => {
  const {actions, reducer} = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
      setInfo(state, action: PayloadAction<T>): DynamicState<T> {
        return {
          ...state,
          info: {
            ...state.info,
            ...action.payload,
          },
        } as DynamicState<T>;
      },
      setAccessToken(state, action: PayloadAction<string>): DynamicState<T> {
        return {
          ...state,
          accessToken: action.payload,
        } as DynamicState<T>;
      },
      reset(): DynamicState<T> {
        return {
          ...initialState,
        } as DynamicState<T>;
      },
    },
  });

  let _store: Store | undefined;
  const setStore = (store: Store) => {
    _store = store;
  };

  const _getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'You need to run setStore right after init store to use this function',
      );
    }

    return _store;
  };

  const getInfo = (): T => {
    //@ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSelector(state => state.user.info);
  };

  const getAccessToken = (): string => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSelector(state => state.user.accessToken);
    // return _getStore().getState().user.accessToken || '';
  };

  const setInfo = (info: T) => {
    return _getStore().dispatch(actions.setInfo(info));
  };

  const setAccessToken = (accessToken: string) => {
    return _getStore().dispatch(actions.setAccessToken(accessToken));
  };

  const reset = () => {
    return _getStore().dispatch(actions.reset());
  };

  return {
    actions,
    reducer,
    getAccessToken,
    getInfo,
    setStore,
    setInfo,
    reset,
    setAccessToken,
  };
};
