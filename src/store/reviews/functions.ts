import {client} from '@/libs';
import {setProductQueries, syncProduct} from '@/store/product';
import {setReviewsQueries, syncReviews} from '@/store/reviews/slice';
import {ParamsReviewInterface} from '@/screens/Home/screens/Products/Modals/ReviewsModal';
import {ParamsReviewsInterface} from '@/store/reviews/types';

export const requestProductReviews = async (params: ParamsReviewsInterface) => {
  const reviews = await client.getProductReviews(params);
  let newData = reviews.map(item => item.id) || [];

  // const res = await Promise.all(
  //   reviews.map(async item => {
  //     return await client.getProductById(item.product_id.toString());
  //     // @ts-ignore
  //   }),
  // );

  // syncProduct(res.flat());
  syncReviews(reviews);
  // setProductQueries({
  //   // @ts-ignore
  //   ['reviews']: [...new Set(reviews)],
  // });
  // @ts-ignore
  setReviewsQueries({['all']: [...new Set(newData)]});
  return reviews;
};

export const requestPostReviews = async (params: ParamsReviewInterface) => {
  return await client.postReviews(params);
};
