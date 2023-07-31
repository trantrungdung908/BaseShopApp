import fetch from 'isomorphic-unfetch';
import {emitter, EVENTS} from './emitter';
import axios, {AxiosPromise, AxiosRequestConfig} from 'axios';
import {client} from '@/libs/apis';
import {getUserAccessToken} from '@/store/user';
import qs from 'query-string';

export type FetcherError = Error & {response: Response};

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  if (res.ok) {
    return res.json();
  }
  const json = await res.json();

  const error = new Error(json?.message || res.statusText) as FetcherError;
  error.response = res;
  error.message = json?.message;
  emitter.emit(EVENTS.API_ERROR, {
    input,
    status: res.status,
    statusText: res.statusText,
    message: json?.message,
    response: res,
  });

  return Promise.reject(error);
}

export async function postWithToken<ResponseType>(
  url: string,
  method: string,
  params: Object = {},
  {
    requestTimeout,
    ...config
  }: AxiosRequestConfig & {requestTimeout?: number} = {requestTimeout: 30000},
): Promise<AxiosPromise<ResponseType>> {
  const _cancelToken = axios.CancelToken.source();
  const _timeoutId = setTimeout(() => {
    _cancelToken.cancel(config?.timeoutErrorMessage ?? 'REQUEST_TIMED_OUT');
  }, requestTimeout || 30000);
  const response = await axios({
    url,
    headers: {
      'Content-Type':
        'application/json, application/xml, text/plain,image/jpeg, text/html, *.*',
      ...config.headers,
    },
    method,
    data: params,
    cancelToken: _cancelToken.token,
    ...config,
    onDownloadProgress: progressEvent => {
      clearTimeout(_timeoutId);
      config?.onDownloadProgress?.(progressEvent);
    },
  });
  clearTimeout(_timeoutId);

  // @ts-ignore
  return response;
}

export async function get<ResponseType>(
  url: string,
  params: Object | undefined = undefined,
  config?: AxiosRequestConfig,
): Promise<AxiosPromise<ResponseType>> {
  const stringify = qs.stringify(params || {});
  return axios.get(url + (stringify ? `?${stringify}` : ''), config);
}
