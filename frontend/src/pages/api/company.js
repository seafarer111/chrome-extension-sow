import { apiDelete, apiGet, apiPost, apiPut } from './index';

async function create(data) {
  try {
    await apiPost(`/company`, data);
    return Promise.resolve({ message: 'success' });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function update(data) {
  try {
    await apiPut(`/company/${data._id}`, data);
    return Promise.resolve({ message: 'success' });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function remove(id) {
  try {
    await apiDelete(`/company/${id}`);
    return Promise.resolve({ message: 'success' });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function get(id) {
  try {
    let company = await apiGet(`/company/${id}`);
    return Promise.resolve(company);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getFilter(filter) {
  try {
    let parts = await apiPost(`/company/filter`, filter);
    return Promise.resolve(parts);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getAll() {
  try {
    let companies = await apiGet(`/company/all`);
    return Promise.resolve(companies);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function GetUsersGPT(data) {
  try {
    const users = await apiPost(`/company/gpt`, data);
    console.log(users);
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
}

export { create, update, remove, get, getAll, getFilter, GetUsersGPT };
