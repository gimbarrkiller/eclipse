import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';

const baseURL = process.env.REACT_APP_API_URL as string;

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

  const url = `${baseURL}${endpoint}`;

  const body = JSON.stringify(payload);

  const requestOptions: Record<string, any> = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  const response: Response = yield call(fetch, url, requestOptions);

  let json: Record<string, any>;

  try {
    const unknowJson: any = yield call([response, response.json]);
    json = unknowJson;
  } catch (error) {
    json = {
    };
  }
  return json;
}
