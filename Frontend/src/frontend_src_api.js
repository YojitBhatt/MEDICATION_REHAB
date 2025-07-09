import axios from "axios";

const API_URL = "http://localhost:5000/api";

export function getAuthHeaders(token) {
  return { Authorization: "Bearer " + token };
}

export const api = {
  async register(data) {
    return axios.post(`${API_URL}/auth/register`, data);
  },
  async login(data) {
    return axios.post(`${API_URL}/auth/login`, data);
  },
  async getProfile(token) {
    return axios.get(`${API_URL}/user/me`, { headers: getAuthHeaders(token) });
  },
  // Medications
  async getMedications(token) {
    return axios.get(`${API_URL}/medications`, { headers: getAuthHeaders(token) });
  },
  async addMedication(token, data) {
    return axios.post(`${API_URL}/medications`, data, { headers: getAuthHeaders(token) });
  },
  async editMedication(token, id, data) {
    return axios.put(`${API_URL}/medications/${id}`, data, { headers: getAuthHeaders(token) });
  },
  async deleteMedication(token, id) {
    return axios.delete(`${API_URL}/medications/${id}`, { headers: getAuthHeaders(token) });
  },
  // Rehab
  async getRehab(token) {
    return axios.get(`${API_URL}/rehab`, { headers: getAuthHeaders(token) });
  },
  async addRehab(token, data) {
    return axios.post(`${API_URL}/rehab`, data, { headers: getAuthHeaders(token) });
  },
  async editRehab(token, id, data) {
    return axios.put(`${API_URL}/rehab/${id}`, data, { headers: getAuthHeaders(token) });
  },
  async deleteRehab(token, id) {
    return axios.delete(`${API_URL}/rehab/${id}`, { headers: getAuthHeaders(token) });
  },
  // Update profile
  async updateProfile(token, data) {
    return axios.put(`${API_URL}/user/me`, data, { headers: getAuthHeaders(token) });
  }
};