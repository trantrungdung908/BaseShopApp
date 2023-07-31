export interface RawCommentInterface {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  date_gmt: string;
  content: {
    rendered: string;
  };
  link: string;
  status: string;
  type: string;
  meta: any[];
}

export interface ParamsCommentPostInterface {
  content: string;
  post: number;
}
