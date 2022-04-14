import axios from 'axios';

const plainApi = axios.create({ baseURL: 'https://nocodb.lb.djnd.si/' });
const authedApi = axios.create({ baseURL: 'https://nocodb.lb.djnd.si/' });

// automatically add auth header to all api requests
authedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers['xc-auth'] = `${token}`;
  return config;
});

const refreshAuth = async () => {
  const response = await plainApi.post('/auth/refresh-token', null, {
    // refresh token is in a http only cookie
    withCredentials: true,
  });
  localStorage.setItem('token', response.data.token);
};

// refresh the token and retry if request fails with 401 (Unauthorized)
authedApi.interceptors.response.use(null, async (error) => {
  if (error.config && error.response.status === 401) {
    // try refreshing the access token
    try {
      await refreshAuth();
    } catch (e) {
      // refresh failed; just reject with the original error
      return Promise.reject(error);
    }
    // retry the same request again
    return authedApi(error.config);
  }
  // rejecting with the error is the default behaviour
  return Promise.reject(error);
});

export async function login(email, password) {
  return plainApi.post('/auth/signin', { email, password });
}

export async function me() {
  return authedApi.get('/user/me');
}
