import ListProduct from "../components/ListProduct";
import { getCookie } from "../utils";
import AdminMenu from "./AdminMenu";
const AdminProductPage = {
  async render() {
    return /*html*/ `
    ${await AdminMenu.render()}
      ${await ListProduct.render()}
    `;
  },
  async afterRender() {
    return `${await ListProduct.afterRender()}`;
  },
};

export default AdminProductPage;
