import { api } from "./api";

export const serviceApi = {
  createService: (id, payload) =>
    api.post(`api/workers/${id}/services`, payload),
  getServices: () => api.get("api/service"),
  deleteService: (id) => api.delete(`api/service/${id}`),
};
