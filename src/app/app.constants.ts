const BASE_URL = 'http://localhost:3000/v1';

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  GET_USERS: `${BASE_URL}/users`,
  UPDATE_USERS: `${BASE_URL}/users`,
  GET_ADMIN_DATA: `${BASE_URL}/admin`,
  REFRESH: `${BASE_URL}/auth/refresh-tokens`,
  VALIDATE_TOKEN: `${BASE_URL}/auth/validate-token`,
  GET_PATIENTS: `${BASE_URL}/patients`,
  ADD_PATIENT: `${BASE_URL}/patients`,
  UPDATE_PATIENT: `${BASE_URL}/patients`,
  DELETE_PATIENT: `${BASE_URL}/patients`,
};

export const ROLES = {
  PRACTITIONER: 'practitioner',
  CLINIC_ADMIN: 'clinicadmin',
  ADMIN: 'admin',
  USER: 'user',
};
