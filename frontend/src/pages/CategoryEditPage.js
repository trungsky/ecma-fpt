import { parseRequestUrl, $, checkRole } from "../utils";
import CategoryApi from "../api/CategoryApi";
import AdminMenu from "./AdminMenu";
const CategoryEditPage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: categories } = await CategoryApi.get(id);
    checkRole();
    return /*html*/ `
    ${await AdminMenu.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto p-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        <!-- End -->


        <!-- Credit card form content -->
        <div class="tab-content">

          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <p class="text-center text-xl">Chỉnh sửa category</p>
            <form role="form" id="form-update">
              <div class="form-group">
                <label for="category-id">ID Category</label>
                <input type="text" id="category-id" placeholder="Tên sản phẩm" value="${categories.id}" disabled class="form-control">
              </div>
              <div class="form-group">
                <label for="category-name">Category name</label>
                <div class="input-group">
                  <input type="text" id="category-name" placeholder="Your card number" value="${categories.name}" class="form-control" required>
                </div>
              </div>
              
              <button type="submit" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
            </form>
          </div>
          <!-- End -->
      </div>
    </div>
  </div>`;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    const { data: category } = await CategoryApi.get(id);
    $("#form-update").addEventListener("submit", async function (e) {
      e.preventDefault();
      if (category.name == $("#category-name").value) {
        toastr.warning("Không có gì thay đổi!", "Thành công");
      } else {
        const newProduct = {
          id: id,
          name: $("#category-name").value,
        };
        CategoryApi.update(id, newProduct);
        toastr.success("Update thành công!", "Thành công");
      }

      // window.location.hash("/listproduct");
    });
  },
};

export default CategoryEditPage;
