export interface RawRequestAPI<T> {
  error: boolean;
  message: string;
  code: number;
  data: T;
}

export interface TypeLinks{
  collection:{href:string}[];
  self:{href:string}[];
}
