import {TypeLinks} from '@/types';

export interface RawAttributesTypeInterface {
  id: number;
  has_archives: boolean;
  name: string;
  parent: number;
  order_by: string;
  slug: number;
  type: number;
  _links: TypeLinks;
}

export interface RawAttributesInterface {
  count: number;
  description: string;
  id: number;
  menu_order: number;
  name: string;
  slug: string;
  _links: TypeLinks;
}
