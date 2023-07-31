export interface RawOrdersInterface {
  id: number;
  parent_id: number;
  order_key: string;
  status: string;
  currency: string;
  date_created: string;
  date_created_gmt: string;
  date_modified: string;
  date_modified_gmt: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2?: string;
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
  };
  payment_method: string;
  payment_method_title: string;
  line_items: RawItemOrder[];
}

interface RawItemOrder {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: [
    {
      id: number;
      total: string;
      subtotal: string;
    },
  ];
  meta_data: [
    {
      id: number;
      key: string;
      value: string;
    },
  ];
  sku: string;
  price: number;
}

export interface ParamsOrderInterface {
  payment_method?: string;
  payment_method_title?: string;
  customer_id: number;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2?: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
    email: string;
    phone: string;
  };
  shipping?: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
    state: string;
  };
  line_items: RawLineItems[];
  coupon_lines?: RawCouponLines[];
}

interface RawLineItems {
  product_id: number;
  quantity: number;
  variation_id?: number;
}

interface RawCouponLines {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: any[];
}

export interface ParamPutOrderInterface {
  status: string;
}
