import CategoryApi from "../api/CategoryApi";
import { $, formatter, reRender } from "../utils";

const ListCategory = {
  async render() {
    const { data: categories } = await CategoryApi.getAll();
    return `
    <div class="table-responsive">
    <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="list-category">
          ${categories
            .map((category) => {
              return `
              <tr>
              <td>${category.id}</td>
              <td>${category.name}</td>
              <td><a href="/#/editcategory/${category.id}"><button class="btn btn-primary">Update</button></a>
              <button class="btn btnss btn-danger btn-remove" data-id="${category.id}">Delete</button>
              </td>
            </tr>
              `;
            })
            .join("")}
          </tbody>
        </table>
        </div>
        `;
  },
  async afterRender() {
    const btns = $("#list-category .btnss");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (btn.classList.contains("btn-remove")) {
          const question = confirm("Xóa ko");
          if (question) {
            await CategoryApi.remove(id);
            await reRender(ListCategory, "#list-category");
          }
        }
      });
    });
  },
};

export default ListCategory;
