import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
// import { userToken } from 'utils'

export interface ApiErrorData {
  message: string;
}

// Create a map to store the AbortController instances
const abortControllers = new Map<string, AbortController>();

// Create a function to generate a unique token for each request
const generateRequestToken = (config: InternalAxiosRequestConfig) => {
  const { method, url, params, data } = config;
  return `${String(method)}-${String(url)}-${JSON.stringify(params)}-${JSON.stringify(data)}`;
};

// Create instance of axios
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// Create a request interceptor for the instance and get accessToken
http.interceptors.request.use(
  async (config) => {
    // Attach an AbortController to the request
    const requestToken = generateRequestToken(config);
    const abortController = new AbortController();
    abortControllers.set(requestToken, abortController);
    config.signal = abortController.signal;

    // Set timeout for the request
    // config.timeout = 5000

    // Set Authorization header
    const data = localStorage.getItem('persist:root') ?? '';
    const token = data && JSON.parse(data || '');
    const jwt = JSON.parse(token.auth);

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    config.headers.Authorization = `Bearer ${jwt.accessToken} `;
    return config;
  },
  async (error) => {
    console.log('Global Error 2', error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line consistent-return
  async (error: AxiosError<ApiErrorData>) => {
    if (axios.isAxiosError(error) && error.response) {
      if (error?.response.status === 401 || error?.response?.status === 500) {
        // localStorage.clear()
        // window.location.reload()
        return '';
      }
      throw error;
    }
  }
);

// Create a function to cancel a request using the associated AbortController
export const cancelRequest = (config: InternalAxiosRequestConfig) => {
  const requestToken = generateRequestToken(config);
  const abortController = abortControllers.get(requestToken);
  if (abortController) {
    abortController.abort();
    abortControllers.delete(requestToken);
  }
};

export default http;
