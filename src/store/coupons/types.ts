import {TypeLinks} from '@/types';

export interface RawCouponsInterface {
  id: number;
  code: string;
  amount: string;
  status: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_type: string;
  description: string;
  date_expires: null | string;
  date_expires_gmt: null | string;
  usage_count: number;
  individual_use: boolean;
  product_ids: string[];
  excluded_product_ids: string[];
  usage_limit: null | string;
  usage_limit_per_user: null | string;
  limit_usage_to_x_items: null | string;
  free_shipping: boolean;
  product_categories: string[];
  excluded_product_categories: string[];
  exclude_sale_items: boolean;
  minimum_amount: string;
  maximum_amount: string;
  email_restrictions: string[];
  used_by: string[];
  meta_data: any[];
  _links: TypeLinks;
}
