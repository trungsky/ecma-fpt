import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: 'https://5e79b4b817314d00161333da.mockapi.io',
  baseURL: "http://localhost:8081/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const ProductApi = {
  getAll() {
    const url = `/products`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  add(product) {
    const url = `/products`;
    return axiosClient.post(url, product);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },
  search(name) {
    const url = `/products?q=${name}`;
    return axiosClient.get(url, data);
  },
  getWithLimit(page) {
    const url = `/products?_limit=6&_page=${page}`;
    return axiosClient.get(url);
  },
  homeItems() {
    const url = `/products?_limit=6&_sort=id&_order=DESC`;
    return axiosClient.get(url);
  },
  getWithSort(page, sort) {
    const url = `/products?_limit=6&_page=${page}&_sort=${sort}&_order=DESC`;
    return axiosClient.get(url);
  },
};

export default ProductApi;
