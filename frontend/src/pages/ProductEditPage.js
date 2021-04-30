import { parseRequestUrl, $ } from "../utils";
import ProductApi from "../api/ProductApi";
import CategoryApi from "../api/CategoryApi";
import firebase from "firebase";
import "../../firebase";
import AdminMenu from "./AdminMenu";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ProductEditPage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: products } = await ProductApi.get(id);
    const { data: categories } = await CategoryApi.getAll();
    return /*html*/ `
    ${await AdminMenu.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto my-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        <!-- End -->
        <!-- Credit card form content -->
        <div class="tab-content">

          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <p class="text-center text-xl">Chỉnh sửa sản phẩm: ${
              products.name
            }</p>
            <form role="form" id="form-update">
              <div class="form-group">
                <label for="product-name">Tên sản phẩm</label>
                <input type="text" id="product-name" placeholder="Tên sản phẩm" value="${
                  products.name
                }" required class="form-control">
              </div>
              <div class="form-group">
                <label for="product-price">Giá sản phẩm</label>
                <div class="input-group">
                  <input type="number" id="product-price" placeholder="Your card number" value="${
                    products.price
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="product-quantity">Số lượng sản phẩm</label>
                <div class="input-group">
                  <input type="number" id="product-quantity" placeholder="Your card number" value="${
                    products.quantity
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label for="product-sale">Giảm giá</label>
                <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="product-status" ${
                  products.status ? "checked" : ""
                }>
                <label class="custom-control-label" for="product-status">Giảm giá</label>
                </div>
              </div>

              <select id="product-category" class="form-select" aria-label="Category">
              ${categories
                .map((cate) => {
                  return `
                  <option value="${cate._id}" ${
                    cate._id == products.category ? "selected" : ""
                  }>${cate.name}</option>
                  `;
                })
                .join("")}
                
              </select>
              

              <div class="mb-3">
                  <label for="product-image" class="form-label">Image</label>
                  <input class="form-control" type="file" id="product-image">
                  <img class="img pt-2" src="${products.photo}" width="200px"/>
              </div>

              <div class="mb-3">
              <label for="editor" class="form-label">Description</label>
              <textarea name="content" id="editor">
              ${products.description}
              </textarea>
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
    const { data: products } = await ProductApi.get(id);

    let myEditor;
    ClassicEditor.create(document.querySelector("#editor"))
      .then((editor) => {
        myEditor = editor;
      })
      .catch((err) => {
        console.error(err.stack);
      });

    $("#form-update").addEventListener("submit", async function (e) {
      e.preventDefault();
      const file = document.querySelector("#product-image").files[0];
      if (file == undefined) {
        const newProduct = {
          // id: products._id,
          name: $("#product-name").value,
          price: $("#product-price").value,
          quantity: $("#product-quantity").value,
          status: $("#product-status").checked ? true : false,
          category: $("#product-category").value,
          photo: products.photo,
          description: myEditor.getData(),
        };
        ProductApi.update(id, localStorage.getItem("id"), newProduct);
        toastr.success("Update thành công!", "Thành công");
        location.href = "/#/listproduct";

      } else {
        const storageRef = firebase.storage().ref(`images/${file.name}`);
        await storageRef.put(file).then(function () {
          storageRef.getDownloadURL().then((url) => {
            const newProduct = {
              // id: products._id,
              name: $("#product-name").value,
              price: $("#product-price").value,
              quantity: $("#product-quantity").value,
              status: $("#product-status").checked ? true : false,
              category: $("#product-category").value,
              photo: url,
              description: myEditor.getData(),
            };
            ProductApi.update(id, localStorage.getItem("id"), newProduct);
            toastr.success("Update thành công!", "Thành công");
            location.href = "/#/listproduct";
          });
        });
      }

      // window.location.hash("/listproduct");
    });
  },
};

export default ProductEditPage;
