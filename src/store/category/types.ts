import {ImageInterface} from '@/store/product';

export interface RawCategoryInterface {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  menu_order: number;
  count: number;
  display: string;
  image: ImageInterface;
}
