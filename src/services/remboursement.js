import apiClient from "./api.js";

class RemboursementDataService {
  getAll() {
    return apiClient.get("/remboursement");
  }

  get(id) {
    return apiClient.get(`/remboursement/${id}`);
  }

  create(data) {
    return apiClient.post("/remboursement", data);
  }

  update(id, data) {
    return apiClient.put(`/remboursement/${id}`, data);
  }

  delete(id) {
    return apiClient.delete(`/remboursement/${id}`);
  }

  deleteAll() {
    return apiClient.delete(`/remboursement`);
  }

  findByTitle(title) {
    return apiClient.get(`/remboursement?title=${title}`);
  } 

}

export default new RemboursementDataService();