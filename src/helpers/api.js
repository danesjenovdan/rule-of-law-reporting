import axios from 'axios';

const plainApi = axios.create({
  baseURL: 'https://nocodb.lb.djnd.si/api/v1/db/',
});
const authedApi = axios.create({
  baseURL: 'https://nocodb.lb.djnd.si/api/v1/db/',
});

// window.api = authedApi;

const projectName = 'ROL App Try 2';

// automatically add auth header to all api requests
authedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers['xc-auth'] = `${token}`;
  return config;
});

const refreshAuth = async () => {
  const response = await plainApi.post('auth/token/refresh', null, {
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
  return plainApi.post('auth/user/signin', { email, password });
}

export async function me() {
  return authedApi.get('auth/user/me');
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('files', file);
  return authedApi.post('storage/upload', formData);
}

export async function postConnectDogodekVir(dogodekId, virId) {
  return authedApi.post(`data/noco/${projectName}/m2mDogodek_Vir`, {
    table1_id: dogodekId,
    table2_id: virId,
  });
}

export async function getAreas() {
  return authedApi.get(`data/noco/${projectName}/Področje`);
}

export async function getContributions() {
  return authedApi.get(`data/noco/${projectName}/Prispevek`);
}

export async function getContribution(id) {
  // TODO: change to fields=* when it will work: https://github.com/nocodb/nocodb/issues/1981
  return authedApi.get(
    `data/noco/${projectName}/Prispevek/${id}?nested[Prispevek => Dogodek][fields]=Kaj se je zgodilo in kako vpliva na vladavino prava,Naslov dogodka,Objavljeno,created_at,id,updated_at`
  );
}

export async function postContribution(data) {
  return authedApi.post(`data/noco/${projectName}/Prispevek`, data);
}

export async function filterContributions(filter = {}) {
  // create 'where' query
  const where = Object.entries(filter)
    .map(([key, value]) => {
      // if value is array use 'in' query
      if (Array.isArray(value)) {
        return `(${key},in,${value})`;
      }
      return `(${key},${value})`; // for created_at fields the operator is in the input field name, so we skip it here
      // TODO: query for 'created_at' does not work (date format is wrong)
    })
    .join('~and'); // TODO: this is wrong - there should be 'or' between areas field, 'and' between date range field, ...

  // console.log(where)
  return authedApi.get(`data/noco/${projectName}/Prispevek?where=${where}`);
}

export async function getEvents(filter = {}) {
  const where = Object.entries(filter)
    .map(([key, value]) => `(${key},eq,${value})`)
    .join('~and');
  return authedApi.get(`data/noco/${projectName}/Dogodek?where=${where}`);
}

export async function postEvent(data) {
  const postData = { ...data };
  if (
    Number.isNaN(Number(postData.nc_0zwf__dogodek_id)) ||
    postData.nc_0zwf__dogodek_id <= 0
  ) {
    postData.nc_0zwf__dogodek_id = undefined;
  }
  return authedApi.post(`data/noco/${projectName}/Dogodek`, postData);
}

export async function postSource(data) {
  const {
    'Dokumenti povezani z virom': files,
    related_dogodek_id: dogodekId,
    ...postData
  } = data;

  const fileResponses = await Promise.all(
    files.map((file) => uploadFile(file.file))
  );
  const uploadedFiles = fileResponses.map((r) => r.data).flat();

  postData['Dokumenti povezani z virom'] = JSON.stringify(uploadedFiles);

  const response = await authedApi.post(
    `data/noco/${projectName}/Vir`,
    postData
  );

  if (dogodekId) {
    await postConnectDogodekVir(dogodekId, response.data.id);
  }

  return response;
}

export async function getSourcesFromEvent(dogodekId) {
  return authedApi.get(
    `data/noco/${projectName}/Dogodek/${dogodekId}/mm/Dogodek <=> Vir`
  );
}

export async function getReports(filter = {}) {
  const where = Object.entries(filter)
    .map(([key, value]) => `(${key},eq,${value})`)
    .join('~and');
  return authedApi.get(`data/noco/${projectName}/Poročilo?where=${where}`);
}
