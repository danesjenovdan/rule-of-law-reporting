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

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'json',
    JSON.stringify({
      api: 'xcAttachmentUpload',
      project_id: 'rol_app_try_2_0zwf',
      dbAlias: 'db',
      args: {},
    })
  );
  return authedApi.post('/dashboard?project_id=rol_app_try_2_0zwf', formData);
}

export async function getAreas() {
  return authedApi.get('/nc/rol_app_try_2_0zwf/api/v1/Področja');
}

export async function getReports() {
  return authedApi.get('/nc/rol_app_try_2_0zwf/api/v1/Prispevek');
}

export async function postReport(data) {
  return authedApi.post(`/nc/rol_app_try_2_0zwf/api/v1/Prispevek`, data);
}

export async function getEvents(filter = {}) {
  const where = Object.entries(filter)
    .map(([key, value]) => `(${key},eq,${value})`)
    .join('~and');
  return authedApi.get(`/nc/rol_app_try_2_0zwf/api/v1/Dogodek?where=${where}`);
}

export async function postEvent(data) {
  const postData = { ...data };
  if (
    Number.isNaN(Number(postData.nc_0zwf__dogodek_id)) ||
    postData.nc_0zwf__dogodek_id <= 0
  ) {
    postData.nc_0zwf__dogodek_id = undefined;
  }
  return authedApi.post(`/nc/rol_app_try_2_0zwf/api/v1/Dogodek`, postData);
}

export async function postSource(data) {
  const { 'Dokumenti povezani z virom': files, ...postData } = data;

  const fileResponses = await Promise.all(
    files.map((file) => uploadFile(file.file))
  );
  const uploadedFiles = fileResponses.map((r) => r.data);

  postData['Dokumenti povezani z virom'] = JSON.stringify(uploadedFiles);

  return authedApi.post(`/nc/rol_app_try_2_0zwf/api/v1/Vir`, postData);
}
