import {
  RawCustomerInterface,
  RawMeInterface,
  RawUserInterface,
} from '@/store/user/types';
import {createUserReducer} from '@/store/user/reducer';

type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A & keyof B
    ? A[K] | B[K]
    : K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
};

export const {
  setStore: setUserStore,
  actions: userActions,
  reducer: userReducer,
  getAccessToken: getUserAccessToken,
  setInfo: setUserInfo,
  setAccessToken,
  getInfo,
  reset,
} = createUserReducer<
  Merge<Merge<RawUserInterface, RawMeInterface>, RawCustomerInterface>
>('user');
