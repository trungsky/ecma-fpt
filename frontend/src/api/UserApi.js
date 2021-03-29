import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: 'https://5e79b4b817314d00161333da.mockapi.io',
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const UserApi = {
  getAll() {
    const url = `/getUser`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/getUser/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/getUser/del/${id}`;
    return axiosClient.get(url);
  },
  update(id) {
    const url = `/getUser/update/${id}`;
    return axiosClient.get(url);
  },
};
export default UserApi;
