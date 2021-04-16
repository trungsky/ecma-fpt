import { axiosClient } from "./axiosClient";

const BillingApi = {
  getAll() {
    const url = `/banner`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/banner/${id}`;
    return axiosClient.get(url);
  },
  update(data) {
    const url = `/banner/6078fdee9a2cd21a44a13366`;
    return axiosClient.patch(url, data);
  },
  // create(data) {
  //   const url = `/banner`;
  //   return axiosClient.post(url, data);
  // },
};
export default BillingApi;
