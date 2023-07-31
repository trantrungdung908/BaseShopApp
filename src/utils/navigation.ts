import React from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {TransitionPresets} from '@react-navigation/stack';
import {CommonActions, DrawerActions} from '@react-navigation/core';
import {ModalRoutes, Routes} from '@/Routes';
import {DetailsProductInterface} from '@/screens/Home/screens/Products/ProductDetailsScreen';
import {FilterProductModalInterface} from '@/screens/Home/screens/Products/Modals/FilterProductModal';
import {DetailsPortfolioInterface} from '@/screens/Portfolio/screens/PortfolioDetailsScreen';
import {BlogInterface} from '@/screens/Home/screens/Forum/BlogScreen';
import {OrderInterface} from '@/screens/Home/screens/Products/OrderScreen';
import {SearchScreenInterface} from '@/screens/Home/screens/Search/SearchScreen';
import {ParamsStatusAddress} from '@/screens/User/modals/AddAddressModal';
import {MethodModalInterface} from '@/screens/Home/screens/Products/Modals/MethodModal';
import {TrackDetailsInterface} from '@/screens/Home/screens/TrackOrder/TrackOrderDetailsScreen';
import {ReviewsModalInterface} from '@/screens/Home/screens/Products/Modals/ReviewsModal';
import {CouponModalInterface} from '@/screens/Home/screens/Products/Modals/CouponModal';
import {ParamsCategory} from '@/screens/Home/screens/Products/CategoryScreen';
import {VoucherBrandModalInterface} from '@/screens/Home/screens/Products/Modals/VoucherBrandModal';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;
export const modalScreenOption = TransitionPresets.ModalSlideFromBottomIOS;

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigation = () => navigationRef.current!;

export const openDrawer = () =>
  navigation().dispatch(DrawerActions.openDrawer());

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().navigate(screenName, params);
  };

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.push(screenName, params));
  };

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const clearStack =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: Routes.BottomStackScreen},
          {name: screenName, params: params},
        ],
      }),
    );
  };

export const goBack = () => navigation().goBack();
//Screen
export const navigateToRootScreen = createReplace(Routes.RootStackContainer);
export const navigateToLoginScreen = createNavigate(Routes.LoginScreen);
export const navigateToRegisterScreen = createNavigate(Routes.RegisterScreen);
export const navigateToMainStack = createNavigate(Routes.MainStackComponent);

export const navigateToListProductScreen = createNavigate(
  Routes.ListProductScreen,
);

export const navigateToProductDetailsScreen =
  createNavigate<DetailsProductInterface>(Routes.ProductDetailsScreen);

export const pushToProductDetailsScreen = createPush<DetailsProductInterface>(
  Routes.ProductDetailsScreen,
);

export const navigateToSearchScreen = createNavigate<SearchScreenInterface>(
  Routes.SearchScreen,
);

export const navigateToCartScreen = createNavigate(Routes.CartScreen);

export const pushToCartScreen = createPush(Routes.CartScreen);

export const navigateToOrderScreen = createNavigate<OrderInterface>(
  Routes.OrderScreen,
);

export const navigateToTrackOrderScreen = createNavigate(
  Routes.TrackOrderScreen,
);

export const navigateToTrackOrderDetailsScreen =
  createNavigate<TrackDetailsInterface>(Routes.TrackOrderDetailsScreen);

export const navigateToChatScreen = createNavigate(Routes.ChatScreen);

export const navigateToChatDetailsScreen = createNavigate(
  Routes.ChatDetailsScreen,
);

export const navigateToForumsScreen = createNavigate(Routes.ForumScreen);

export const navigateToPortfolioDetailsScreen =
  createNavigate<DetailsPortfolioInterface>(Routes.PortfolioDetailsScreen);

export const navigateToModalStack = createNavigate(Routes.ModalStackComponent);

export const navigateToEditInfo = createNavigate(Routes.EditInformationScreen);

export const navigateToChangePassword = createNavigate(Routes.ChangePassword);

export const navigateToDeleteUser = createNavigate(Routes.DeleteUser);

export const navigateToModalTopic = createNavigate(Routes.TopicScreen);

export const navigateToModalGuideCode = createNavigate(Routes.GuideCodeScreen);

export const navigateToModalAddress = createNavigate(Routes.AddressScreen);

export const navigateToYourPostsScreen = createNavigate(Routes.YourPostsScreen);

export const navigateToBlogDetailScreen = createNavigate(
  Routes.BlogDetailScreen,
);

export const navigateToBlogScreen = createNavigate<BlogInterface>(
  Routes.BlogScreen,
);

export const navigateToVoucherScreen = createNavigate(Routes.VoucherScreen);

export const navigateToModalSearch = createNavigate(Routes.SearchModal);

export const navigateToCategoryScreen = createNavigate<ParamsCategory>(
  Routes.CategoryScreen,
);

export const navigateToSaleCodeScreen = createNavigate(Routes.SaleCodeScreen);

//Modal
export const openModalAddress = createNavigate<ParamsStatusAddress>(
  ModalRoutes.AddAddressModal,
);

export const navigateToFilterProductModal =
  createNavigate<FilterProductModalInterface>(ModalRoutes.FilterProductModal);

export const navigateToPaymentMethodModal =
  createNavigate<MethodModalInterface>(ModalRoutes.PaymentMethodModal);

export const navigateToReviewsModal = createNavigate<ReviewsModalInterface>(
  ModalRoutes.ReviewsModal,
);

export const navigateToCouponModal = createNavigate<CouponModalInterface>(
  ModalRoutes.CouponModal,
);

export const navigateToVoucherBrandModal =
  createNavigate<VoucherBrandModalInterface>(ModalRoutes.VoucherBrandModal);

export const clearStackForTrackOrderScreen = clearStack(
  Routes.TrackOrderScreen,
);
