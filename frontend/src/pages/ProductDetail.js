import ProductApi from "../api/ProductApi";
import { parseRequestUrl, $, formatter, getCookie } from "../utils";
import data from "../../../db.json";
const ProductDetail = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: products } = await ProductApi.get(id);
    const cateResult = data.products.filter((product) => {
      return product.category == products.category;
    });
    const resStatus = getCookie("resStatus");
    if (resStatus != undefined) {
      if (resStatus == "success") {
        toastr.success("Thêm vào giỏ hàng thành công nhé bủh!");
      }
    }
    const sameProduct = cateResult
      .map((item) => {
        return `<div class="col-lg-3 col-md-4 col-6">
      <div class="product">
        <div class="product-image">
        ${item.status ? "<div class='ribbon ribbon-info'>SALE</div>" : ""}

        <img class="img-fluid" src="${item.image}" alt="product"/>
          <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
            item.id
          }"></a>
            <div class="product-hover-overlay-buttons"><a class="btn btn-dark btn-buy" href="/#/products/${
              item.id
            }">
            <i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a>
            </div>
          </div>
        </div>
        <div class="py-2">
          <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
            item.id
          }">${item.name}</a></h3>
          <span class="text-muted">${formatter.format(item.price)}</span>
        </div>
      </div>
    </div>`;
      })
      .join("");
    return /*html*/ `
            <div>
            <section class="product-details">
            <div class="container-fluid">
              <div class="row">
                <div class="ml-4 col-lg-6 py-3 order-2 order-lg-1">
                  <div class="detail-full" data-slider-id="1">
                    <div class="detail-full-item">
                    <img class="img-fluid mh-100 w-100" src=${products.image}>
                    
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center col-lg-6 col-xl-5 pl-lg-5 mb-5 order-1 order-lg-2">
                  <div>
                    <ul class="breadcrumb justify-content-start">
                      <li class="breadcrumb-item"><a href="/#/">Home</a></li>
                      <li class="breadcrumb-item active">${products.name}</li>
                    </ul>
                    <h1 class="mb-4">${products.name}</h1>
                    <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                      <ul class="list-inline mb-2 mb-sm-0">
                      
                        <li class="list-inline-item h4 font-weight-light mb-0">${formatter.format(
                          products.price
                        )}</li>
                      </ul>
                    </div>
                    <div class="row">
                    <div class="col-sm-6 col-lg-12 detail-option mb-3">
                      <h6 class="detail-option-heading">Size <span>(required)</span></h6>
                      <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_S"> Small
                        <input class="sizeInput" type="radio" name="size" value="S" id="size_S" checked>
                      </label>
                      <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_M"> Medium
                        <input class="sizeInput" type="radio" name="size" value="M" id="size_M" required>
                      </label>
                      <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_L"> Large
                        <input class="sizeInput" type="radio" name="size" value="L" id="size_L" required>
                      </label>
                    </div>
                    
                    
                    <div class="col-12 col-lg-6 detail-option mb-5">
                      <label class="detail-option-heading font-weight-bold">Items <span>(required)</span></label>
                      <input class="form-control detail-quantity products-quantity" name="quantity" id="product_quantity" type="number" min="1" value="1">
                    </div>
                  </div>
                          <button class="btn btn-dark btn-lg mb-1" id="btnAdd">
                          <i class="fa fa-shopping-cart mr-2"></i>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="mt-5">
            <div class="container">
              <ul class="nav nav-tabs flex-column flex-sm-row" role="tablist">
                <li class="nav-item"><a class="nav-link detail-nav-link active" data-toggle="tab" href="#description" role="tab">Description</a></li>
              </ul>
              <div class="tab-content py-4">
                <div class="tab-pane active px-3" id="description" role="tabpanel">
                <span>
                ${
                  products.description == undefined
                    ? "Sản phẩm này chưa có đì cờ díp sừn"
                    : products.description
                }
                </span>
                </div>
                <section class="my-5">
            <div class="container">
              <header class="text-center">
                <h6 class="text-uppercase mb-5">You might also like</h6>
              </header>
              <div class="row">
                <!-- product-->
                  ${sameProduct}
                <!-- /product-->
              </div>
            </div>
          </section>
            </div>
            `;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    const { data: products } = await ProductApi.get(id);
    var oldItems = JSON.parse(localStorage.getItem("itemsArray")) || [];
    $("#btnAdd").addEventListener("click", async function (e) {
      if ($("#product_quantity").value < 1) {
        toastr.error("Vớ va vớ vẩn");
      } else {
        var newItem = {
          id: `${products._id}`,
          name: `${products.name}`,
          price: `${products.price}`,
          image: `${products.image}`,
          quantity: `${$(".products-quantity").value}`,
          size: `${$("input[name = size]:checked").value}`,
        };

        oldItems.push(newItem);
        document.cookie = `resStatus=success; max-age=5;`;

        // if (oldItems.length == 0) {
        //   oldItems.push(newItem);
        // }
        // if (oldItems.length >= 1) {
        //   oldItems.map((e) => {
        //     if (e.id == id) {
        //       console.log("trùng");
        //       e.quantity++;
        //     } else {
        //       oldItems.push(newItem);
        //     }
        //   });
        // }

        localStorage.setItem("itemsArray", JSON.stringify(oldItems));
        window.location.reload();
      }
    });

    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });
  },
};

export default ProductDetail;
