import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawProductReviewsInterface} from '@/store/reviews/types';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export const {
  setStore: setReviewsStore,
  actions: reviewsActions,
  useByKey: useReviews,
  useKeysByQuery: useReviewsByQuery,
  getByKey: getReviewsByKey,
  reducer: reviewsReducer,
  getKeysByQuery: getReviewsByQuery,
  sync: syncReviews,
  setQueries: setReviewsQueries,
} = createDynamicReducer<RawProductReviewsInterface>('reviews', 'id');

const allReviewByKey = (state: RootState) => state.reviews.byKey;

const allReviewByIds = (state: RootState) => state.reviews.query.all || [];

const productsSelectorFactory = (productId: number) =>
  createSelector(allReviewByIds, allReviewByKey, (byIds, byKey) => {
    return byIds
      .map(item => {
        if (byKey[item].product_id === productId) {
          return byKey[item];
        }
      })
      .filter(Boolean);
  });

export const getProductsByReviews = (productId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(productsSelectorFactory(productId)) || [];
};

const reviewsSelectorFactory = createSelector(
  allReviewByIds,
  allReviewByKey,
  (byIds, byKey) => {
    return byIds
      .map(item => {
        return byKey[item];
      })
      .filter(Boolean);
  },
);

export const getAllReviews = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(reviewsSelectorFactory) || [];
};
