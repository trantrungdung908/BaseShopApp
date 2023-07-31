// import {RawSubjectInterface} from '@/store/subject';
//
import {TypeLinks} from '@/types';

export interface RawCountryInterface {
  code: string;
  name: string;
  states: any[];
  _link: TypeLinks;
}
