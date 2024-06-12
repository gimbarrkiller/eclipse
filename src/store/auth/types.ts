export interface AuthState {
  isLoading: boolean,
  email: string,
  accessToken?: string,
  country: {
    value: string,
    label: string,
  }[],
}

export interface AuthData {
  email: string,
  password: string,
  passwordRepeat: string,
  country?: string,
  ref: string,
  onCallback: () => void,
}

export interface CountryRequest {
  name: {
    common: string,
  },
}
