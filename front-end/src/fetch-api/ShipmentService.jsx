/* eslint-disable no-undef */
import http from "../http-common";

class ShipmentDataService {
  getAll(params) {
    return http.get("/shipments", { params });
  }

  get(id) {
    return http.get(`/shipments/${id}`);
  }

  create(data) {
    return http.post("/shipments", data);
  }

  update(id, data) {
    return http.put(`/shipments/${id}`, data);
  }

  remove(id) {
    return http.delete(`/shipments/${id}`);
  }

  removeAll() {
    return http.delete("/shipments");
  }

  findByTitle() {
    return http.get(`/shipments?title=${title}`);
  }
}

export default new ShipmentDataService();
