import ListCategory from "../components/ListCategory";
import { getCookie, checkRole } from "../utils";
import AdminMenu from "./AdminMenu";
const AdminCategoryPage = {
  async render() {
    checkRole();


    return /*html*/ `
    ${await AdminMenu.render()}
      ${await ListCategory.render()}
    `;
  },
  async afterRender() {
    return `${await ListCategory.afterRender()}`;
  },
};

export default AdminCategoryPage;
