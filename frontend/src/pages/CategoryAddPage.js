import CategoryApi from "../api/CategoryApi";
import { $, checkRole } from "../utils";
import AdminMenu from "./AdminMenu";
const CategoryAddPage = {
  async render() {
    checkRole();

    const { data: categories } = await CategoryApi.getAll();
    return /*html*/ `
    ${await AdminMenu.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto p-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        
        <!-- End -->


        <!-- Credit card form content -->
        <div class="tab-content p-5">

          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <form role="form" id="form-add">
              <div class="form-group">
                <label for="product-name">Tên Category</label>
                <input type="text" id="category-name" placeholder="Tên Category" required class="form-control">
              </div>
             
              <button type="submit" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
            </form>
          </div>
          <!-- End -->

          

      </div>
    </div>
  </div>`;
  },
  afterRender() {
    $("#form-add").addEventListener("submit", async (e) => {
      e.preventDefault();
      const category = {
        // id: "ID_" + Math.random().toString(36).substr(2, 6),
        name: $("#category-name").value,
      };
      CategoryApi.add(category);
    });
  },
};

export default CategoryAddPage;
