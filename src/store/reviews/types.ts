import {TypeLinks} from '@/types';

export interface RawProductReviewsInterface {
  id: number;
  date_created: string;
  date_created_gmt: string;
  product_id: number;
  product_name: string;
  product_permalink: string;
  status: string;
  reviewer: string;
  reviewer_email: string;
  review: string;
  rating: number;
  verified: boolean;
  reviewer_avatar_urls: Record<string, any>;
  _links: TypeLinks;
}

export interface ParamsReviewsInterface {
  page: number;
  per_page: number;
}
