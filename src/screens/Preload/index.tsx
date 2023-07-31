import React, {useEffect} from 'react';
import {styled} from '@/global';
import {useSetupLanguage} from '@/hooks/useSetupLanguage';
import {navigateToRootScreen} from '@/utils/navigation';
import ScreenWrapper from '@/components/ScreenWrapper';
import {ActivityIndicator} from 'react-native';
import {Colors} from '@/themes';
import {useSimulator} from '@/utils/device';

export const PreloadScreen = React.memo(function PreloadScreen() {
  const [loading, setLoading] = React.useState<boolean>(false);

  useSetupLanguage();

  useEffect(() => {
    navigateToRootScreen();
  }, []);
  return (
    <SScreenWrapper>
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
    </SScreenWrapper>
  );
});

const SScreenWrapper = styled(ScreenWrapper)`
  align-items: center;
  justify-content: center;
`;

export default PreloadScreen;
