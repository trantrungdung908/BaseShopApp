import {TypeLinks} from '@/types';

export interface RawPaymentInterface {
  id: string;
  title: string;
  description: string;
  order: string;
  enabled: string;
  _links: TypeLinks;
}
