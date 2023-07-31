import React, {memo, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {
  defaultScreenOptions,
  modalScreenOption,
  navigationRef,
} from '@/utils/navigation';
import {IC_HOME, IC_MALL, IC_NOTI, IC_USER} from '@/assets';
import {CustomTabBar, TabBarIcon} from '@/components/CustomTabBar';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import PreloadScreen from '@/screens/Preload';
import {ModalRoutes, Routes} from './Routes';
import HomeScreen from '@/screens/Home/HomeScreen';
import LoginScreen from '@/screens/Login/LoginScreen';
import OnboardScreen from '@/screens/Onboard/OnboardScreen';
import {AuthContextProvider} from '@/screens/Login/authContext';
import RegisterScreen from '@/screens/Login/RegisterScreen';
import PortfolioScreen from '@/screens/Portfolio/PortfolioScreen';
import {NotificationScreen} from '@/screens/Notification/NotificationScreen';
import {UserScreen} from '@/screens/User/UserScreen';
import ListProductScreen from '@/screens/Home/screens/Products/ListProductScreen';
import ForumScreen from '@/screens/Home/screens/Forum/ForumScreen';
import ProductDetailsScreen from '@/screens/Home/screens/Products/ProductDetailsScreen';
import CartScreen from '@/screens/Home/screens/Products/CartScreen';

import {EditInformationScreen} from '@/screens/User/screens/EditInformationScreen';
import {ChangePasswordScreen} from './screens/User/screens/ChangePasswordScreen';
import {AddressScreen} from '@/screens/User/screens/AddressScreen';
import {AddAddressModal} from '@/screens/User/modals/AddAddressModal';
import {YourPostsScreen} from '@/screens/User/screens/YourPostsScreen';
import OrderScreen from '@/screens/Home/screens/Products/OrderScreen';
import MethodModal from '@/screens/Home/screens/Products/Modals/MethodModal';
import CouponModal from '@/screens/Home/screens/Products/Modals/CouponModal';
import {TrackOrderScreen} from '@/screens/Home/screens/TrackOrder/TrackOrderScreen';
import {TrackOrderDetailsScreen} from '@/screens/Home/screens/TrackOrder/TrackOrderDetailsScreen';
import {VoucherScreen} from '@/screens/Home/screens/VoucherScreen/VoucherScreen';
import {PortfolioDetailsScreen} from '@/screens/Portfolio/screens/PortfolioDetailsScreen';
import {getApp} from '@/store/constant';
import {getUserAccessToken} from '@/store/user';
import FilterProductModal from '@/screens/Home/screens/Products/Modals/FilterProductModal';
import {BlogDetailScreen} from '@/screens/Home/screens/Forum/BlogDetailScreen';
import BlogScreen from '@/screens/Home/screens/Forum/BlogScreen';
import {SearchScreen} from '@/screens/Home/screens/Search/SearchScreen';
import ReviewsModal from '@/screens/Home/screens/Products/Modals/ReviewsModal';
import {OfflineScreen} from '@/screens/Offline/OfflineScreen';
import NetInfo from '@react-native-community/netinfo';
import {SearchModal} from '@/screens/Home/modals/SearchModal';
import CategoryScreen from '@/screens/Home/screens/Products/CategoryScreen';
import SaleCodeScreen from '@/screens/Home/screens/Code/SaleCodeScreen';
import VoucherBrandModal from '@/screens/Home/screens/Products/Modals/VoucherBrandModal';
import {DeleteUserScreen} from '@/screens/User/screens/DeleteUserScreen';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();
const BottomStack = createBottomTabNavigator();

const MainStackComponent = React.memo(function MainStackComponent() {
  return (
    <MainStack.Navigator
      initialRouteName={Routes.BottomStackScreen}
      screenOptions={{
        ...defaultScreenOptions,
        headerShown: false,
      }}>
      <MainStack.Screen
        name={Routes.BottomStackScreen}
        component={BottomStackScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <MainStack.Screen
        name={Routes.EditInformationScreen}
        component={EditInformationScreen}
      />
      <MainStack.Screen
        name={Routes.ListProductScreen}
        component={ListProductScreen}
      />
      <MainStack.Screen
        name={Routes.ProductDetailsScreen}
        component={ProductDetailsScreen}
      />

      <MainStack.Screen name={Routes.SearchScreen} component={SearchScreen} />

      <MainStack.Screen name={Routes.SearchModal} component={SearchModal} />

      <MainStack.Screen name={Routes.BlogScreen} component={BlogScreen} />

      <MainStack.Screen name={Routes.CartScreen} component={CartScreen} />

      <MainStack.Screen name={Routes.OrderScreen} component={OrderScreen} />

      <MainStack.Screen name={Routes.ForumScreen} component={ForumScreen} />

      <MainStack.Screen
        name={Routes.PortfolioDetailsScreen}
        component={PortfolioDetailsScreen}
      />

      <MainStack.Screen
        name={Routes.TrackOrderScreen}
        component={TrackOrderScreen}
      />

      <MainStack.Screen
        name={Routes.TrackOrderDetailsScreen}
        component={TrackOrderDetailsScreen}
      />

      <MainStack.Screen name={Routes.VoucherScreen} component={VoucherScreen} />
      <MainStack.Screen
        name={Routes.BlogDetailScreen}
        component={BlogDetailScreen}
      />
      <MainStack.Screen
        name={Routes.ChangePassword}
        component={ChangePasswordScreen}
      />
      <MainStack.Screen name={Routes.DeleteUser} component={DeleteUserScreen} />
      <MainStack.Screen name={'Modal'} component={ModalStackComponent} />

      <MainStack.Screen
        name={Routes.YourPostsScreen}
        component={YourPostsScreen}
      />
      <MainStack.Screen name={Routes.AddressScreen} component={AddressScreen} />

      <MainStack.Screen name={Routes.OfflineScreen} component={OfflineScreen} />

      <MainStack.Screen
        name={Routes.CategoryScreen}
        component={CategoryScreen}
      />

      <MainStack.Screen
        name={Routes.SaleCodeScreen}
        component={SaleCodeScreen}
      />
    </MainStack.Navigator>
  );
});

const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <ModalStack.Navigator
      initialRouteName={Routes.MainStackComponent}
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        ...modalScreenOption,
      }}>
      <ModalStack.Screen
        name={Routes.MainStackComponent}
        component={MainStackComponent}
      />
      <ModalStack.Screen
        name={ModalRoutes.AddAddressModal}
        component={AddAddressModal}
      />
      <MainStack.Screen
        name={ModalRoutes.FilterProductModal}
        component={FilterProductModal}
      />
      <MainStack.Screen
        name={ModalRoutes.PaymentMethodModal}
        component={MethodModal}
      />
      <MainStack.Screen
        name={ModalRoutes.CouponModal}
        component={CouponModal}
      />
      <ModalStack.Screen
        name={ModalRoutes.ReviewsModal}
        component={ReviewsModal}
      />
      <ModalStack.Screen
        name={ModalRoutes.VoucherBrandModal}
        component={VoucherBrandModal}
      />
    </ModalStack.Navigator>
  );
});

const BottomStackScreen = React.memo(function BottomStackScreen() {
  return (
    <BottomStack.Navigator
      initialRouteName={Routes.HomeScreen}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: JSX.IntrinsicAttributes & BottomTabBarProps) => (
        <CustomTabBar {...props} />
      )}>
      <BottomStack.Screen
        name={Routes.HomeScreen}
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_HOME} color={color} />
          ),
        }}
        component={HomeScreen}
      />
      <BottomStack.Screen
        name={Routes.PortfolioScreen}
        options={{
          title: 'Portfolio',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_MALL} color={color} />
          ),
        }}
        component={PortfolioScreen}
      />

      <BottomStack.Screen
        name={Routes.NotificationScreen}
        options={{
          title: 'Thông báo',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_NOTI} color={color} />
          ),
        }}
        component={NotificationScreen}
      />
      <BottomStack.Screen
        name={Routes.UserScreen}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} icon={IC_USER} color={color} />
          ),
        }}
        component={UserScreen}
      />
    </BottomStack.Navigator>
  );
});

export const RootStackContainer = React.memo(function RootStackContainer() {
  const token = getUserAccessToken();
  const [isConnect, setIsConnect] = useState(true);
  useEffect(() => {
    return NetInfo.addEventListener(state => {
      setIsConnect(
        state.isInternetReachable === null ? true : state.isInternetReachable,
      );
    });
  }, []);

  return (
    <RootStack.Navigator
      initialRouteName={Routes.LoginScreen}
      screenOptions={{
        gestureEnabled: false,
        headerMode: 'screen',
        headerShown: false,
      }}>
      {isConnect ? (
        <>
          {token === '' ? (
            <RootStack.Group navigationKey={token === '' ? 'auth' : 'user'}>
              <RootStack.Screen
                name={Routes.LoginScreen}
                component={LoginScreen}
              />
              <RootStack.Screen
                name={Routes.RegisterScreen}
                component={RegisterScreen}
              />
            </RootStack.Group>
          ) : (
            <RootStack.Screen
              name={Routes.ModalStackComponent}
              component={ModalStackComponent}
            />
          )}
        </>
      ) : (
        <RootStack.Screen
          name={Routes.OfflineScreen}
          component={OfflineScreen}
        />
      )}
    </RootStack.Navigator>
  );
});

export const AppContainer = React.memo(function AppContainer() {
  const routeNameRef = React.useRef<string>('');
  const isInitApp = getApp();

  const onStateChange = React.useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <AuthContextProvider>
      <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
        <RootStack.Navigator
          initialRouteName={
            isInitApp ? Routes.RootStackContainer : Routes.OnboardScreen
          }
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
          }}>
          <RootStack.Screen
            name={Routes.Preload}
            component={PreloadScreen}
            options={{animationTypeForReplace: 'pop'}}
          />
          <RootStack.Screen
            name={Routes.OnboardScreen}
            component={OnboardScreen}
            options={{animationTypeForReplace: 'pop'}}
          />
          <RootStack.Screen
            options={{gestureEnabled: false}}
            name={Routes.RootStackContainer}
            component={RootStackContainer}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
});

export default AppContainer;
