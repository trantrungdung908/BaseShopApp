import {TypeLinks} from '@/types';

export interface RawUserInterface {
  id: number;
  name: string;
  url: string;
  description: string;
  billing: ParamChangeAddressInterface;
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  avatar_url: string;
}

export interface ParamChangeAddressInterface {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  country: string;
  state: string;
  email: string;
  phone: string;
}

export interface RawApiDataUserInterface {
  token: string;
  user: RawUserInterface;
}

export interface RawMeInterface {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: Record<number, string>;
  meta: any[];
  yoast_head: null | string;
  yoast_head_json: null | string;
  is_super_admin: boolean;
  woocommerce_meta: {
    activity_panel_inbox_last_read: string;
    activity_panel_reviews_last_read: string;
    categories_report_columns: string;
    coupons_report_columns: string;
    customers_report_columns: string;
    orders_report_columns: string;
    products_report_columns: string;
    revenue_report_columns: string;
    taxes_report_columns: string;
    variations_report_columns: string;
    dashboard_sections: string;
    dashboard_chart_type: string;
    dashboard_chart_interval: string;
    dashboard_leaderboard_rows: string;
    homepage_layout: string;
    homepage_stats: string;
    task_list_tracked_started_tasks: string;
    help_panel_highlight_shown: string;
    android_app_banner_dismissed: string;
  };
  _links: TypeLinks;
}

export interface RawCustomerInterface {
  id: number;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    phone: string;
  };
  is_paying_customer: false;
  avatar_url: string;
  meta_data: [
    {
      id: string;
      key: string;
      value: string;
    },
    {
      id: string;
      key: string;
      value: string;
    },
    {
      id: string;
      key: string;
      value: {
        expires: string;
        products: [
          {
            ID: string;
            product_id: string;
            wishlist_id: string;
            date_added: string;
          },
        ];
      };
    },
    {
      id: string;
      key: string;
      value: {
        expires: string;
        products: [
          {
            ID: string;
            product_id: string;
            wishlist_id: string;
            date_added: string;
          },
        ];
      };
    },
  ];
  _links: TypeLinks;
}
