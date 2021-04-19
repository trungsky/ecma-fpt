import ListProduct from "../components/ListProduct";
import { getCookie, checkRole } from "../utils";
import AdminMenu from "./AdminMenu";
const AdminProductPage = {
  async render() {
    checkRole();

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
