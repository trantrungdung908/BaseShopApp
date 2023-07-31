import {TypeLinks} from '@/types';

export interface RawProductsInterface {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: ImageInterface[];
  categories: CategoryInterface[];
  short_description: string;
  type: string;
  status: string;
  price_html: string;
  average_rating: string;
  rating_count: number;
  attributes: [
    {
      id: number;
      name: string;
      option: string;
    },
  ];
  reviews_allowed: boolean;
  permalink: string;
  parent_id: number;
  featured: boolean;
  related_ids: number[];
  purchasable?: boolean;
  tags?: {id: number; slug: string; name: string}[];
  date_on_sale_from: string;
  date_on_sale_from_gmt: string;
  date_on_sale_to: string;
  date_on_sale_to_gmt: string;
  stock_status: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
  slug: string;
}

export interface ImageInterface {
  id: number;
  src: string;
  name: string;
}
