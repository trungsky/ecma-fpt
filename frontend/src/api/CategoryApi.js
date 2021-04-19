import { axiosClient } from "./axiosClient";
import { getCookie } from "../utils";

const CategoryApi = {
  getAll() {
    const url = `/categories`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },
  add(id, category) {
    const url = `/category/create/${id}`;
    return axiosClient.post(url, category, {
      headers: {
        Authorization: "Bearer " + getCookie("t"),
      },
    });
  },
  remove(id) {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/category/${id}`;
    return axiosClient.patch(url, data);
  },
};
export default CategoryApi;
