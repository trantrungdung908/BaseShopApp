export interface RawMediaInterface {
  id: number;
  date: string;
  guid: {
    rendered: string;
  };
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  author: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
}
