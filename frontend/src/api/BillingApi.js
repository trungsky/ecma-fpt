import { axiosClient } from "./axiosClient";

const BillingApi = {
  getAll() {
    const url = `/billing`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/billing/${id}`;
    return axiosClient.get(url);
  },
  add(billing) {
    const url = `/billing`;
    return axiosClient.post(url, billing);
  },
  remove(id) {
    const url = `/billing/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/billing/${id}`;
    return axiosClient.put(url, data);
  },
};
export default BillingApi;
