import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setStore} from '@/store/getStore';
import {setUserStore, userReducer} from '@/store/user';
import {productReducer, setProductStore} from '@/store/product/slice';
import {categoryReducer, setCategoryStore} from '@/store/category/slice';
import {portfolioReducer, setPortfolioStore} from '@/store/portfolio/slice';
import {attributesReducer, setAttributesStore} from '@/store/attributes';
import {constantReducer, setConstantStore} from '@/store/constant';
import {postReducer, setPostStore} from '@/store/posts';
import {cartReducer, setCartStore} from '@/store/cart';
import {commentReducer, setCommentStore} from '@/store/comments';
import {paymentReducer, setPaymentStore} from '@/store/payment';
import {searchReducer, setSearchStore} from '@/store/search';
import {countryReducer, setCountryStore} from '@/store/countries';
import {orderReducer, setOrderStore} from '@/store/order';
import {reviewsReducer, setReviewsStore} from '@/store/reviews';
import {couponsReducer, setCouponsStore} from '@/store/coupons';
import {mediaReducer, setMediaStore} from '@/store/media';

const middlewares: any[] = [];

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const appReducer = combineReducers({
  constant: constantReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  portfolio: portfolioReducer,
  attributes: attributesReducer,
  post: postReducer,
  comment: commentReducer,
  payment: paymentReducer,
  search: searchReducer,
  country: countryReducer,
  order: orderReducer,
  reviews: reviewsReducer,
  coupons: couponsReducer,
  media: mediaReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE_DATA') {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    whitelist: ['constant', 'user'], // if you want to persist something, put it here
    storage: AsyncStorage,
  },
  rootReducer,
);

export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store);

export default store;

setStore(store);
setUserStore(store);
setProductStore(store);
setCategoryStore(store);
setCartStore(store);
setPortfolioStore(store);
setAttributesStore(store);
setPostStore(store);
setCommentStore(store);
setPaymentStore(store);
setSearchStore(store);
setCountryStore(store);
setOrderStore(store);
setReviewsStore(store);
setCouponsStore(store);
setMediaStore(store);
setConstantStore(store);
