import Toast from 'react-native-toast-message';
import {translate} from '@/global';
import {Platform} from 'react-native';

export const ErrorCodeMap: Record<string, string> = {
  '990': 'error.unknown_error',
  '996': 'error.empty_data',
  '997': 'error.conflict_data',
  '998': 'error.invalid_data',
  '999': 'error.incomplete_data',
  '1001': 'error.invalid_user',
  '1002': 'error.invalid_authentication',
  '1003': 'error.login_required',
  '1005': 'error.db_error',
  '1006': 'error.internal_error',
  '1020': 'error.invalid_email',
  '1021': 'error.invalid_password',
  '1022': 'error.invalid_username',
  '1023': 'error.invalid_character',
  '1024': 'error.invalid_captcha',
  'PROFILE.NOT.FOUND': 'error.Profile_not_found',
};
const topOffSet = Platform.OS === 'ios' ? 60 : 40;

export class ToastServiceClass {
  _getRealMessage = (message: string): string => {
    // @ts-ignore
    if (ErrorCodeMap[message]) {
      // @ts-ignore
      return ErrorCodeMap[message];
    }
    if (Number.isNaN(parseInt(message))) {
      return message;
    }
    return translate('error.unknown_error');
  };

  show = (message: any) => {
    if (typeof message !== 'string') {
      return;
    }
    return Toast.show({
      type: 'success',
      text1: this._getRealMessage(message) || '',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: topOffSet,
    });
  };

  showInfo = (message: any) => {
    if (typeof message !== 'string') {
      return;
    }
    return Toast.show({
      type: 'info',
      text1: this._getRealMessage(message) || '',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: topOffSet,
    });
  };

  showError = (message: any) => {
    if (typeof message !== 'string') {
      return;
    }

    return Toast.show({
      type: 'error',
      text1: this._getRealMessage(message),
      visibilityTime: 2000,
      autoHide: true,
      topOffset: topOffSet,
    });
  };
}

const ToastService = new ToastServiceClass();

export default ToastService;
