import ProductApi from "../api/ProductApi";
import CategoryApi from "../api/CategoryApi";
import { $, checkRole } from "../utils";
import firebase from "firebase";
import "../../firebase";
import test from "./AdminMenu";
const ProductAddPage = {
  async render() {
    checkRole();

    const { data: categories } = await CategoryApi.getAll();
    return /*html*/ `
    ${await test.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto p-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        
        <!-- End -->
        <!-- Credit card form content -->
        <div class="tab-content">
          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <form role="form" id="form-add">
              <div class="form-group">
                <label for="product-name">Tên sản phẩm</label>
                <input type="text" id="product-name" placeholder="Tên sản phẩm" class="form-control">
              </div>
              <div class="form-group">
                <label for="product-price">Giá sản phẩm</label>
                <div class="input-group">
                  <input type="number" id="product-price" placeholder="Giá sản phẩm" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label for="product-quantity">Số lượng sản phẩm</label>
                <div class="input-group">
                  <input type="number" id="product-quantity" placeholder="Số lượng sản phẩm" class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label for="product-sale">Giảm giá</label>
                <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="product-status">
                <label class="custom-control-label" for="product-status">Giảm giá</label>
                </div>
              </div>
              <select id="product-category" class="form-select" aria-label="Category">
                <option value="0" selected>Chưa phân loại</option>
                ${categories
                  .map((cate) => {
                    return `
                    <option value="${cate.id}">${cate.name}</option>
                    `;
                  })
                  .join("")}
              </select>
              <div class="mb-3">
              <label for="product-image" class="form-label">Image</label>
              <input class="form-control" type="file" id="product-image">
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
      if ($("#product-name").value == "") {
        toastr.error("Chưa nhập tên sản phẩm kìa bồ ơi");
      } else if ($("#product-price").value == "") {
        toastr.error("Chưa nhập giá sản phẩm kìa bồ ơi");
      } else if ($("#product-price").value < 0) {
        toastr.error("Giá ko hợp lý nha bồ");
      } else if ($("#product-quantity").value < 0) {
        toastr.error("quantity ko hợp lý nha bồ");
      }

      const file = document.querySelector("#product-image").files[0];
      if (file == undefined) {
        toastr.error("Chưa chọn ảnh kìa bủh", "Lỗi!");
        e.preventDefault();
      } else {
        const storageRef = firebase.storage().ref(`images/${file.name}`);
        await storageRef.put(file).then(function () {
          storageRef.getDownloadURL().then((url) => {
            const product = {
              // id: Math.random().toString(36).substr(2, 6),
              name: $("#product-name").value,
              price: $("#product-price").value,
              quantity: $("#product-quantity").value,
              status: $("#product-status").checked ? true : false,
              category: $("#product-category").value,
              image: url,
            };
            ProductApi.add(product);
            toastr.success("Thêm sản phẩm thành công", "Thành công!");
            location.href = "/#/listproduct";
          });
        });
      }
    });
  },
};

export default ProductAddPage;
