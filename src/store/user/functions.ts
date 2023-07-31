import {client} from '@/libs';
import {
  ParamLoginInterface,
  ParamRegisterInterface,
} from '@/screens/Login/types';
import {setAccessToken, setUserInfo} from '@/store/user/slice';
import {ParamsEditInfo} from '@/screens/User/types';
import {ParamChangeAddressInterface} from '@/store/user/types';

export const requestSignIn = async (params: ParamLoginInterface) => {
  const res = await client.postSignIn(params);
  client.setPrivateUserHeaders({Authorization: `Bearer ${res.token}`});
  // @ts-ignore
  setAccessToken(res.token);
  return 'Đăng nhập thành công!';
};

// export const getUserMe = async () => {
//   const res = await client.getUser();
//   console.log('res', res);
//   setUserInfo(res);
//   return res;
// };

export const requestChangeAddress = async (
  params: ParamChangeAddressInterface,
  id: number,
  title?: string,
) => {
  const result = {
    [title]: params,
  };

  const res = await client.putAddressUser(result, id);
  // if (res.error) {
  //   throw new Error(res.message);
  // }
  //@ts-ignore
  setUserInfo(result);
  return res;
};

export const requestSignUp = async (params: ParamRegisterInterface) => {
  return 'Đăng ký thành công';
};

export const requestGetMe = async (token: string) => {
  const res = await client.getMe(token);
  const resCustomer = await client.getCustomer(res.id);
  // @ts-ignore
  setUserInfo(resCustomer);
};

export const requestPostMe = async (params: ParamsEditInfo) => {
  const res = await client.postMe(params);
  setUserInfo(res);
};

export const requestChangePassword = async (password: string, id: string) => {
  const res = await client.postUserById(password, id);
  setUserInfo(res);
};

export const requestDeleteUser = async (reassign: number, id: string) => {
  const res = await client.deleteUser(reassign, id);
  return res;
};
