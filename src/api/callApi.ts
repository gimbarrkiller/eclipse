import { SagaIterator } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import { ApiError, LocaleKey } from 'utils';
import { authSelectors } from 'store/auth/selectors';

const baseUrlApi = process.env.REACT_APP_API_URL as string;

export function* callApi(options: {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  payload?: Record<string, any>;
}): SagaIterator {
  const {
    method = 'GET',
    endpoint,
    payload,
  } = options;

  const url = `${baseUrlApi}${endpoint}`;

  const body = JSON.stringify(payload);

  const requestOptions: Record<string, any> = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': localStorage.getItem('lng') || LocaleKey.en,
    },
    body,
  };

  const accessToken: string | undefined = yield select(authSelectors.getProp('accessToken'));

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`;
  }
  const response: Response = yield call(fetch, url, requestOptions);

  let json: Record<string, any>;
  try {
    const unknowJson: any = yield call([response, response.json]);
    json = unknowJson;
  } catch (error) {
    json = {
    };
  }
  const {
    status,
  } = response;

  if (status >= 400) {
    let errorMessage = '';
    /* eslint-disable */
    Object.keys(json).some((key) => {
      if (json[key]) {
        errorMessage = json[key];
        return true;
      }
    });

    const message= errorMessage || 'Request error';
    throw new ApiError(message, status, json.error);
  }
  return json;
}
