import { axiosClient } from "./axiosClient";

const CategoryApi = {
  getAll() {
    const url = `/categories`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },
  add(category) {
    const url = `/category/create`;
    return axiosClient.post(url, category);
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
