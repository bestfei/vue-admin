import axios from 'axios';

let base = '';

export const requestSuccess = params => { return axios.post(`${base}/success`, params).then(res => res.data); };

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const apiGetSystemDetails = params => { return axios.get(`${base}/system/list`, { params: params }); };

export const removeSystemDetail = params => { return axios.get(`${base}/system/remove`, { params: params }); };

export const addSystemDetail = params => { return axios.get(`${base}/system/add`, { params: params }); };

export const editSystem = params => { return axios.get(`${base}/system/edit`, { params: params }); };

export const requestSuccess2 = params => { return axios.get(`${base}/success2`, { params: params }); };
