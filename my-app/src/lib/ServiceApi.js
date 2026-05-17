import { api } from "./api";

export const serviceApi = {
  createService: (payload) => api.create("api/service", payload),
};
