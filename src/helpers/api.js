import axios from 'axios';
import { objectToWhereString } from './query-builder.js';

const plainApi = axios.create({
  baseURL: 'https://nocodb.lb.djnd.si/api/v1/db/',
});
const authedApi = axios.create({
  baseURL: 'https://nocodb.lb.djnd.si/api/v1/db/',
});

window.api = authedApi;

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

export async function getUser(email) {
  const where = objectToWhereString({ Email: email });
  return authedApi.get(
    `data/noco/${projectName}/Uporabnik?where=${where}&fields=id`
  );
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

export async function getContributions(
  fields = 'id',
  search = '',
  onlyPublished = true,
  filters = {},
  showUserCreatedOnly = false
) {
  const filter = filters || {};
  if (onlyPublished) {
    filter.Objavljeno = true;
  }
  if (search) {
    filter['Ime prispevka'] = { op: 'like', value: search };
  }
  const filterUsers = {};
  const userId = localStorage.getItem('user_id');
  if (showUserCreatedOnly) {
    filterUsers.id = userId;

    // FIXME: remove when nested where works properly
    // eslint-disable-next-line no-param-reassign
    fields += ',nc_0zwf___nc_m2m_m49q_5gg05List';
  }
  const where = objectToWhereString(filter);
  const whereUsers = objectToWhereString(filterUsers);

  const response = await authedApi.get(
    `data/noco/${projectName}/Prispevek?limit=10000&fields=${fields}&where=${where}&sort=-updated_at&nested[Prispevek <=> Uporabnik][where]=${whereUsers}`
  );

  // FIXME: remove when nested where works properly
  if (showUserCreatedOnly && response?.data?.list) {
    response.data.list = response.data.list.filter((o) => {
      if (o.nc_0zwf___nc_m2m_m49q_5gg05List) {
        return o.nc_0zwf___nc_m2m_m49q_5gg05List.some(
          (u) => u.table2_id === Number(userId)
        );
      }
      return false;
    });
    response.data.pageInfo.totalRows = response.data.list.length;
  }

  return response;
}

export async function getContribution(id, fields = 'id') {
  return authedApi.get(
    `data/noco/${projectName}/Prispevek/${id}?fields=${fields}&nested[Področja <= Prispevek][fields]=Ime področja&nested[Prispevek <=> Uporabnik][fields]=Ime,Organizacija`
  );
}

export async function getContributionsAllNestedFields(filters = {}) {
  const where = objectToWhereString(filters);
  const urlQuery = [
    `where=${where}`,
    'limit=10000',
    'fields=*',
    'nested[Področja <= Prispevek][limit]=10000',
    'nested[Področja <= Prispevek][fields]=*',
    'nested[Prispevek => Dogodek][limit]=10000',
    'nested[Prispevek => Dogodek][fields]=*',
    'nested[Prispevek => Dogodek][nested][Dogodek <=> Vir][limit]=10000',
    'nested[Prispevek => Dogodek][nested][Dogodek <=> Vir][fields]=*',
  ];
  return authedApi.get(
    `data/noco/${projectName}/Prispevek?${urlQuery.join('&')}`
  );
}

function postAddUserToRecord(recordName, contributionId) {
  const userId = localStorage.getItem('user_id');
  return authedApi.post(
    `data/noco/${projectName}/${recordName}/${contributionId}/mm/${recordName} <=> Uporabnik/${userId}`
  );
}

export async function postContribution(data) {
  const response = await authedApi.post(
    `data/noco/${projectName}/Prispevek`,
    data
  );

  await postAddUserToRecord('Prispevek', response.data.id);

  return response;
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
  return authedApi.get(
    `data/noco/${projectName}/Prispevek?limit=10000&where=${where}`
  );
}

export async function getEvents(fields = 'id', filter = {}) {
  const where = objectToWhereString(filter);
  return authedApi.get(
    `data/noco/${projectName}/Dogodek?limit=10000&fields=${fields}&where=${where}`
  );
}

export async function postEvent(data) {
  const postData = { ...data };
  if (
    Number.isNaN(Number(postData.nc_0zwf__dogodek_id)) ||
    postData.nc_0zwf__dogodek_id <= 0
  ) {
    postData.nc_0zwf__dogodek_id = undefined;
  }
  const response = await authedApi.post(
    `data/noco/${projectName}/Dogodek`,
    postData
  );

  await postAddUserToRecord('Dogodek', response.data.id);

  return response;
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

  await postAddUserToRecord('Vir', response.data.id);

  return response;
}

export async function getSourcesFromEvent(dogodekId) {
  const where = objectToWhereString({
    Objavljeno: true,
  });
  return authedApi.get(
    `data/noco/${projectName}/Dogodek/${dogodekId}/mm/Dogodek <=> Vir?limit=10000&where=${where}`
  );
}

export async function getEventsFromContribution(prispevekId, fields = 'id') {
  const where = objectToWhereString({
    Objavljeno: true,
    nc_0zwf__prispevek_id: prispevekId,
  });
  return authedApi.get(
    `data/noco/${projectName}/Dogodek?limit=10000&fields=${fields}&where=${where}`
  );
}

export async function getReports(filter = {}) {
  // eslint-disable-next-line no-param-reassign
  filter.Objavljeno = true;
  const where = objectToWhereString(filter);
  return authedApi.get(
    `data/noco/${projectName}/Poročilo?limit=10000&where=${where}`
  );
}

export async function postReport(data) {
  const response = await authedApi.post(
    `data/noco/${projectName}/Poročilo`,
    data
  );

  await postAddUserToRecord('Poročilo', response.data.id);

  return response;
}

export async function getReportAuthors() {
  return authedApi.get(
    `data/noco/${projectName}/Poročilo/groupby?limit=10000&column_name=Poročilo je pripravila`
  );
}

export async function getReportYears() {
  return authedApi.get(
    `data/noco/${projectName}/Poročilo/groupby?limit=10000&column_name=Datum oddaje ali objave poročila ali odziva`
  );
}
