import File from '@/services/File';
import ToastService from '@/services/ToastService';
import {Linking, Platform} from 'react-native';
import Share from 'react-native-share';

export const shareFacebook = async (url: string) => {
  if (Platform.OS === 'android') {
    const {isInstalled} = await Share.isPackageInstalled('com.facebook.katana');
    if (!isInstalled) {
      ToastService.showError('Hãy cài đặt Facebook!');
      return;
    }
  } else {
    const res = await Linking.canOpenURL('fb://');
    if (!res) {
      ToastService.showError('Hãy cài đặt Facebook!');
      return;
    }
  }
  await File.share({
    social: Share.Social.FACEBOOK,
    url: url,
  });

  return;
};
