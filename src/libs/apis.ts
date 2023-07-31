import fetcher, {get} from './fetcher';
import Config from 'react-native-config';
import {ParamLoginInterface} from '@/screens/Login/types';
import {
  RawPortfolioInterface,
  RawPortfolioParam,
} from '@/store/portfolio/types';
import qs from 'query-string';
import {
  RawApiDataUserInterface,
  RawCustomerInterface,
  RawMeInterface,
  ParamChangeAddressInterface,
  RawUserInterface,
} from '@/store/user';
import {RawProductsInterface} from '@/store/product';
import {RawCategoryInterface} from '@/store/category';
import {ParamsProductInterface} from '@/screens/Home/screens/Products/ListProductScreen';
import {
  RawAttributesInterface,
  RawAttributesTypeInterface,
} from '@/store/attributes';
import {Buffer} from 'buffer';
import {ParamsPostInterface} from '@/screens/Home/screens/Forum/BlogDetailScreen';
import {RawPostsInterface} from '@/store/posts';
import {BlogInterface} from '@/screens/Home/screens/Forum/BlogScreen';
import {
  ParamAddItemInterface,
  ParamCartItemInterface,
  ParamRemoveItemInterface,
  RawCartInterface,
} from '@/store/cart';
import {
  ParamsCommentPostInterface,
  RawCommentInterface,
} from '@/store/comments';
import {RawPaymentInterface} from '@/store/payment/types';
import {ParamsSearchInterface} from '@/store/search';
import {ParamsEditInfo} from '@/screens/User/types';
import {RawCountryInterface} from '@/store/countries';
import {
  ParamPutOrderInterface,
  ParamsOrderInterface,
  RawOrdersInterface,
} from '@/store/order';
import {TrackParams} from '@/screens/Home/screens/TrackOrder/TrackOrderScreen';
import {
  ParamsReviewsInterface,
  RawProductReviewsInterface,
} from '@/store/reviews';
import {CouponParams, RawCouponsInterface} from '@/store/coupons';
import {ParamsReviewInterface} from '@/screens/Home/screens/Products/Modals/ReviewsModal';
import {RawMediaInterface} from '@/store/media';

export const BASE_URL = Config.WC_BASE_URL;

export const GET_PATHS = {
  signIn: '/jwt-auth/v1/token',
  products: '/wc/v3/products',
  me: '/wp/v2/users/me',
  customers: '/wc/v3/customers',
  categories: '/wc/v3/products/categories',
  carts: '/wc/store/v1/cart',
  portfolios: '/wp/v2/portfolio',
  productAttributes: '/wc/v3/products/attributes',
  productReviews: '/wc/v3/products/reviews',
  post: '/wp/v2/posts',
  comments: '/wp/v2/comments',
  postComments: '/wp/v2/comments?',
  payment: '/wc/v3/payment_gateways',
  validate: '/jwt-auth/v1/token/validate',
  updateCart: '/wc/store/v1/cart/update-item',
  removeCart: '/wc/store/v1/cart/remove-item',
  addCart: '/wc/store/v1/cart/add-item',
  customer: '/wc/v3/customers',
  user: '/wp/v2/users',
  country: '/wc/v3/data/countries',
  order: '/wc/v3/orders',
  coupons: '/wc/v3/coupons',
  applyCoupons: '/wc/store/v1/cart/apply-coupon',
  removeCoupon: '/wc/store/v1/cart/remove-coupon',
  media: '/wp/v2/media',
};

class Client {
  headers: HeadersInit_ = {
    'Content-Type': 'application/json',
  };

  privateHeaders: HeadersInit_ = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${new Buffer(
      `${Config.WC_COMSUMER_KEY}:${Config.WC_SECRET_KEY}`,
    ).toString('base64')}`,
  };

  privateUserHeaders: HeadersInit_ = {
    'Content-Type': 'application/json',
  };

  setHeaders(headers: Record<string, any>) {
    this.headers = {...this.headers, ...headers};
  }

  setPrivateHeaders(headers: Record<string, any>) {
    this.privateHeaders = {...this.privateHeaders, ...headers};
  }

  setPrivateUserHeaders(headers: Record<string, any>) {
    this.privateUserHeaders = {...this.privateUserHeaders, ...headers};
  }

  // postSignIn(params: ParamLoginInterface) {
  //   return get<RawMeInterface>(
  //     `${BASE_URL}${GET_PATHS.signIn}`,
  //     {},
  //     {headers: this.privateUserHeaders},
  //   );
  // }

  postSignIn(params: ParamLoginInterface) {
    return fetcher<RawApiDataUserInterface>(`${BASE_URL}${GET_PATHS.signIn}`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  getMe(token: string) {
    return fetcher<RawUserInterface>(`${BASE_URL}${GET_PATHS.me}`, {
      headers: {
        ...this.privateUserHeaders,
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });
  }

  getProducts(params: ParamsProductInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawProductsInterface[]>(
      `${BASE_URL}${GET_PATHS.products}?${stringifyParams}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getProductById(id: number) {
    return fetcher<RawProductsInterface>(
      `${BASE_URL}${GET_PATHS.products}/${id}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getCarts() {
    return get<RawCartInterface>(
      `${BASE_URL}${GET_PATHS.carts}`,
      {},
      {headers: this.privateUserHeaders},
    );
  }

  getPortfolios(params: RawPortfolioParam) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawPortfolioInterface[]>(
      `${BASE_URL}${GET_PATHS.portfolios}?${stringifyParams}`,
      {
        headers: this.headers,
        method: 'GET',
      },
    );
  }

  getProductsCategories() {
    return fetcher<RawCategoryInterface[]>(
      `${BASE_URL}${GET_PATHS.categories}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getProductsVariationsById(id: number) {
    return fetcher<RawProductsInterface[]>(
      `${BASE_URL}${GET_PATHS.products}/${id}/variations`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getProductAttributes() {
    return fetcher<RawAttributesTypeInterface[]>(
      `${BASE_URL}${GET_PATHS.productAttributes}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getProductAttributesTerms(id: number) {
    return fetcher<RawAttributesInterface>(
      `${BASE_URL}${GET_PATHS.productAttributes}/${id}/terms`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getProductReviews(params: ParamsReviewsInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawProductReviewsInterface[]>(
      `${BASE_URL}${GET_PATHS.productReviews}?${stringifyParams}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getPost(params: ParamsPostInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawPostsInterface[]>(
      `${BASE_URL}${GET_PATHS.post}?${stringifyParams}`,
      {
        headers: this.privateUserHeaders,
        method: 'GET',
      },
    );
  }

  getSearchPost(params: ParamsPostInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawPostsInterface[]>(
      `${BASE_URL}${GET_PATHS.post}?${stringifyParams}`,
      {
        headers: this.privateUserHeaders,
      },
    );
  }

  getSearch(params: ParamsSearchInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawProductsInterface[]>(
      `${BASE_URL}${GET_PATHS.products}?${stringifyParams}`,
      {
        headers: this.privateHeaders,
      },
    );
  }

  getCommentsByPostId(params: BlogInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawCommentInterface[]>(
      `${BASE_URL}${GET_PATHS.comments}?${stringifyParams}`,
      {
        headers: this.privateUserHeaders,
        method: 'GET',
      },
    );
  }

  getPaymentMethod() {
    return fetcher<RawPaymentInterface[]>(`${BASE_URL}${GET_PATHS.payment}`, {
      headers: this.privateHeaders,
      method: 'GET',
    });
  }

  getListCountry() {
    return fetcher<RawCountryInterface[]>(`${BASE_URL}${GET_PATHS.country}`, {
      headers: this.privateHeaders,
      method: 'GET',
    });
  }

  getOrders(params: TrackParams) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawOrdersInterface[]>(
      `${BASE_URL}${GET_PATHS.order}?${stringifyParams}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  getMediaById(id: number) {
    return fetcher<RawMediaInterface>(`${BASE_URL}${GET_PATHS.media}/${id}`, {
      headers: this.privateUserHeaders,
      method: 'GET',
    });
  }

  putAddressUser(params: ParamChangeAddressInterface, id: number) {
    return fetcher<RawUserInterface>(
      `${BASE_URL}${GET_PATHS.customers}/${id}`,
      {
        headers: this.privateHeaders,
        method: 'PUT',
        body: JSON.stringify(params),
      },
    );
  }

  putOrder(params: ParamPutOrderInterface, id: number) {
    return fetcher<RawOrdersInterface>(`${BASE_URL}${GET_PATHS.order}/${id}`, {
      headers: this.privateHeaders,
      method: 'PUT',
      body: JSON.stringify(params),
    });
  }

  postValidate(token: string) {
    return fetcher<any>(`${BASE_URL}${GET_PATHS.validate}`, {
      headers: {
        ...this.privateUserHeaders,
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });
  }

  postItemCart(params: ParamCartItemInterface, nonce: string) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawCartInterface>(
      `${BASE_URL}${GET_PATHS.updateCart}?${stringifyParams}`,
      {
        headers: {...this.privateUserHeaders, Nonce: nonce},
        method: 'POST',
      },
    );
  }

  postCommentPost(params: ParamsCommentPostInterface) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawCommentInterface>(
      `${BASE_URL}${GET_PATHS.postComments}${stringifyParams}`,
      {
        headers: this.privateUserHeaders,
        method: 'POST',
      },
    );
  }

  postRemoveItem(param: ParamRemoveItemInterface, nonce: string) {
    const stringifyParams = qs.stringify(param);
    return fetcher<RawCartInterface>(
      `${BASE_URL}${GET_PATHS.removeCart}?${stringifyParams}`,
      {
        headers: {...this.privateUserHeaders, Nonce: nonce},
        method: 'POST',
      },
    );
  }

  postAddItem(params: ParamAddItemInterface, nonce: string) {
    return fetcher<RawCartInterface>(`${BASE_URL}${GET_PATHS.addCart}`, {
      headers: {...this.privateUserHeaders, Nonce: nonce},
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  getCustomer(id: number) {
    return fetcher<RawCustomerInterface>(
      `${BASE_URL}${GET_PATHS.customer}/${id}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  postMe(params: ParamsEditInfo) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawMeInterface>(
      `${BASE_URL}${GET_PATHS.me}?${stringifyParams}`,
      {
        headers: {...this.privateUserHeaders},
        method: 'POST',
      },
    );
  }

  postUserById(password: string, id: string) {
    return fetcher<RawMeInterface>(
      `${BASE_URL}${GET_PATHS.user}/${id}?password=${password}`,
      {
        headers: {...this.privateUserHeaders},
        method: 'POST',
      },
    );
  }

  postOrder(params: ParamsOrderInterface) {
    return fetcher<RawOrdersInterface>(`${BASE_URL}${GET_PATHS.order}`, {
      headers: this.privateHeaders,
      method: 'POST',
      body: JSON.stringify(params),
    });
  }

  deleteUser(reassign: number, id: string) {
    return fetcher<RawMeInterface>(
      `${BASE_URL}${GET_PATHS.user}/${id}?reassign=${reassign}`,
      {
        headers: {...this.privateUserHeaders},
        method: 'DELETE',
      },
    );
  }

  getCoupon(params: CouponParams) {
    const stringifyParams = qs.stringify(params);
    return fetcher<RawCouponsInterface[]>(
      `${BASE_URL}${GET_PATHS.coupons}?${stringifyParams}`,
      {
        headers: this.privateHeaders,
        method: 'GET',
      },
    );
  }

  postReviews(params: ParamsReviewInterface) {
    return fetcher<RawProductReviewsInterface>(
      `${BASE_URL}${GET_PATHS.productReviews}`,
      {
        headers: this.privateHeaders,
        method: 'POST',
        body: JSON.stringify(params),
      },
    );
  }

  postApplyCoupon(coupon: string, nonce: string) {
    return fetcher<RawCartInterface>(
      `${BASE_URL}${GET_PATHS.applyCoupons}?code=${coupon}`,
      {
        headers: {...this.privateUserHeaders, Nonce: nonce},
        method: 'POST',
      },
    );
  }

  postRemoveCoupon(coupon: string, nonce: string) {
    return fetcher<RawCartInterface>(
      `${BASE_URL}${GET_PATHS.removeCoupon}?code=${coupon}`,
      {
        headers: {...this.privateUserHeaders, Nonce: nonce},
        method: 'POST',
      },
    );
  }
}

const client = new Client();

export {client};
