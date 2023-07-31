export interface RawPortfolioParam {
  page?: number;
  per_page?: number;
  ['project-cat']?: string;
}

export interface RawPortfolioInterface {
  id: number;
  slug: string;
  status: string;
  type: string;
  title: string;
  content: RawPortfolioContentInterface;
}

export interface RawPortfolioContentInterface {
  rendered: string;
  protected: boolean;
}
