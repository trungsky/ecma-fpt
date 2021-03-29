import ProductApi from "../api/ProductApi";
import CategoryApi from "../api/CategoryApi";
import { $, formatter, reRender } from "../utils";

const ListProduct = {
  async render() {
    const { data: products } = await ProductApi.getAll();
    const { data: categories } = await CategoryApi.getAll();
    return `
    <div class="table-responsive">
    <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sale</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="list-product">
          ${products
            .map((product) => {
              return `
              <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td><img src="${product.image}" width="40px"/></td>
              <td>${formatter.format(product.price)}</td>
              <td>${product.quantity}</td>
              <td>${product.status ? 'SALE' : 'NOT SALE'}</td>
              <td>${product.category}</td>
              <td><a href="/#/editproduct/${product.id}"><button class="btn btn-primary">Update</button></a>
              <button class="btn btnss btn-danger btn-remove" data-id="${product.id}">Delete</button>
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
    const btns = $("#list-product .btnss");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (btn.classList.contains("btn-remove")) {
          const question = confirm("Xóa ko");
          if (question) {
            await ProductApi.remove(id);
            await reRender(ListProduct, "#list-product");
          }
        }
      });
    });
  },
};

export default ListProduct;