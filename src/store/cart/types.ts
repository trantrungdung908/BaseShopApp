import {ImageInterface} from '@/store/product';

export interface ParamCartItemInterface {
  key: string;
  quantity: number;
}

export interface ParamRemoveItemInterface {
  key: string;
}

export interface ParamAddItemInterface {
  id: number;
  quantity: number;
  variation?: {attribute: string; value: string}[];
}

export interface RawCouponInCartInterface {
  code: string;
  discount_type: string;
  totals: RawTotals;
}

export interface RawCartInterface {
  coupons: RawCouponInCartInterface[];
  shipping_rates: string;
  shipping_address: RawShippingAddress;
  items: RawItemCart[];
  items_count: number;
  needs_payment: boolean;
  needs_shipping: boolean;
  has_calculated_shipping: boolean;
  totals: RawTotals;
}

export interface RawItemCart {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: RawQuantity;
  name: string;
  short_description: string;
  description: string;
  permalink: string;
  images: ImageInterface[];
  prices: RawPrices;
  totals: RawTotals;
  variation?: {attribute: string; value: string}[];
}

export interface RawShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface RawQuantity {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

export interface RawPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

interface RawTotals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
}
