import { axiosClient } from "./axiosClient";

const ContactApi = {
  getAll() {
    const url = `/contact`;
    return axiosClient.get(url);
  },
  get(id) {
    const url = `/contact/${id}`;
    return axiosClient.get(url);
  },
  add(contact) {
    const url = `/contact`;
    return axiosClient.post(url, contact);
  },
  remove(id) {
    const url = `/contact/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/contact/${id}`;
    return axiosClient.put(url, data);
  },
};
export default ContactApi;
