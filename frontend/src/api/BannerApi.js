import { axiosClient } from "./axiosClient";

const BillingApi = {
  getAll() {
    const url = `/banner`;
    return axiosClient.get(url);
  },
  update(data) {
    const url = `/banner`;
    return axiosClient.put(url, data);
  },
};
export default BillingApi;
