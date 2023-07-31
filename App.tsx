/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {StatusBar, YellowBox} from 'react-native';
import {memo} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AppContainer from './src/AppContainer';
import store, {persistor} from './src/store';
import SplashScreen from 'react-native-splash-screen';
import Toast, {BaseToast} from 'react-native-toast-message';
import {IC_ERROR, IC_CHECK} from './src/assets';
import {Icon} from './src/components/Views/Icon';
import {scale} from './src/utils/scale';
import {MenuProvider} from 'react-native-popup-menu';

const toastConfig = {
  success: ({text1, ...rest}: any) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#DFF6DD', backgroundColor: '#DFF6DD'}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#DFF6DD',
      }}
      text1Style={{
        fontSize: 12,
        color: '#111',
        fontWeight: 'normal',
      }}
      onTrailingIconPress={Toast.hide}
      text1={text1}
      text2={null}
      text1NumberOfLines={5}
      renderLeadingIcon={() => {
        return (
          <Icon
            source={IC_CHECK}
            size={24}
            marginVertical={scale(15)}
            marginHorizontal={0}
          />
        );
      }}
    />
  ),
  error: ({text1, ...rest}: any) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#FDE7E9', backgroundColor: '#FDE7E9'}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: '#FDE7E9',
      }}
      text1Style={{
        fontSize: 12,
        color: '#111',
        fontWeight: 'normal',
      }}
      onTrailingIconPress={Toast.hide}
      text1={text1}
      text2={null}
      text1NumberOfLines={5}
      renderLeadingIcon={() => {
        return (
          <Icon
            source={IC_ERROR}
            size={24}
            marginVertical={scale(15)}
            marginHorizontal={0}
          />
        );
      }}
    />
  ),
};

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = memo(function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar translucent={true} backgroundColor={'black'} />
        <MenuProvider>
          <AppContainer />
        </MenuProvider>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
});

export default App;
