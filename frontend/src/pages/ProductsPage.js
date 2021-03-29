import ProductApi from "../api/ProductApi.js";
import CategoryApi from "../api/CategoryApi";
import { $, formatter, parseRequestUrl, afterRender, reRender } from "../utils";

const ProductsPage = {
  async render() {
    const { id, action, action2 } = parseRequestUrl();
    const { data: categories } = await CategoryApi.getAll();
    const { data: products } = await ProductApi.getAll();
    const { data: productWithLimit } = await ProductApi.getWithLimit(action);
    // const { data: products } = await ProductApi.getWithLimit();
    // const Pages = Math.ceil(productsAll.length / products.length);
    let result = "";
    if (products.length == 0) {
      result = `<h3 class="text-center p-4">Không có sản phẩm nào</h3>`;
    } else {
      result = products
        .map((product) => {
          return `<div class="col-xl-4 col-sm-6">
        <div class="product">
          <div class="product-image">
            ${
              product.status ? '<div class="ribbon ribbon-info">SALE</div>' : ""
            }<img class="img-fluid" src="${product.image}" alt="product"/>
            <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
              product.id
            }"></a>
              <div class="product-hover-overlay-buttons"><a class="btn btn-dark btn-buy" href="/#/products/${
                product.id
              }"><i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a>
              </div>
            </div>
          </div>
          <div class="py-2">
            <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
              product.id
            }">${
            product.name
          }</a></h3><span class="text-muted">${formatter.format(
            product.price
          )}</span>
          </div>
        </div>
      </div>`;
        })
        .join("");
    }
    return `<section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Products        </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Products</h1>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p></div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row">
        <!-- Grid -->
        <div class="products-grid col-xl-9 col-lg-8 order-lg-2">
          <header class="product-grid-header">
            <div class="mr-3 mb-3">
               Showing <strong>${
                 action > 1 ? 6 + (await productWithLimit.length) : "6"
               } </strong>of <strong>${products.length} </strong>products</div>
            <div class="mr-3 mb-3">
            </div>
            <div class="mb-3 d-flex align-items-center"><span class="d-inline-block mr-1">Sort by</span>
              <select id="sort_by" class="custom-select w-auto border-0">
                <option value=""${
                  action2 == "" ? "selected" : ""
                }>Default</option>
                <option value="id"${
                  action2 == "id" ? "selected" : ""
                }>Newest</option>
              </select>
            </div>
          </header>
          <div id="product-list" class="row">
            <!-- product-->
            ${result}
            <!-- /product-->
          </div>
          <nav class="d-flex justify-content-center mb-5 mt-3" aria-label="page navigation">
            <ul id="pagination" class="pagination">
              
            </ul>
          </nav>
        </div>
        <!-- / Grid End-->
        <!-- Sidebar-->
        <div class="sidebar col-xl-3 col-lg-4 order-lg-1">
          <div class="sidebar-block px-3 px-lg-0 mr-lg-4"><a class="d-lg-none block-toggler" data-toggle="collapse" href="#categoriesMenu" aria-expanded="false" aria-controls="categoriesMenu">Product Categories</a>
            <div class="expand-lg collapse" id="categoriesMenu">
              <div class="nav nav-pills flex-column mt-4 mt-lg-0">
              ${categories
                .map((cate) => {
                  return `
                  <a class="nav-link d-flex justify-content-between mb-2" href="/#/category/${cate.id}">
              <span>${cate.name}</span>
              </a>
                  `;
                })
                .join("")}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                    `;
  },
  async afterRender() {
    const { action, action2 } = parseRequestUrl();
    const { data: products } = await ProductApi.getAll();
    const { data: productWithLimit } = await ProductApi.getWithLimit(action);
    const Pages = Math.ceil(products.length / 6);
    let PageOutput = "";
    for (let i = 1; i <= Pages; i++) {
      PageOutput += `<li class="page-item ${
        action == i ? "active" : ""
      }"><a class="page-link" href="/#/products//${i}">${i}</a></li>`;
    }
    const result = productWithLimit
      .map((product) => {
        return `<div class="col-xl-4 col-sm-6">
      <div class="product">
        <div class="product-image">
          ${
            product.status ? '<div class="ribbon ribbon-info">SALE</div>' : ""
          }<img class="img-fluid" src="${product.image}" alt="product"/>
          <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
            product.id
          }"></a>
            <div class="product-hover-overlay-buttons"><a class="btn btn-dark btn-buy" href="/#/products/${
              product.id
            }"><i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a>
            </div>
          </div>
        </div>
        <div class="py-2">
          <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
            product.id
          }">${
          product.name
        }</a></h3><span class="text-muted">${formatter.format(
          product.price
        )}</span>
        </div>
      </div>
    </div>`;
      })
      .join("");
    $("#product-list").innerHTML = `${result}
      `;
    $("#pagination").innerHTML = `
      <li class="page-item"><a class="page-link" href="/#/products//${
        action > 1 ? action - 1 : "1"
      }" aria-label="Previous"><span aria-hidden="true">Prev</span><span class="sr-only">Previous</span></a></li>
      ${PageOutput}
      <li class="page-item"><a class="page-link" href="/#/products//${
        action < Pages ? parseInt(action) + 1 : Pages
      }" aria-label="Next"><span aria-hidden="true">Next</span><span class="sr-only">Next</span></a></li>`;
    $("#sort_by").addEventListener("change", (e) => {
      e.preventDefault();
      window.location = `http://localhost:8080/#/products//${
        action == undefined ? "1" : action
      }/${$("#sort_by").value}`;
    });

    if (action2 != undefined) {
      const { data: productWithSort } = await ProductApi.getWithSort(
        action,
        action2
      );
      const Pages = Math.ceil(products.length / 6);
      let PageOutput = "";
      for (let i = 1; i <= Pages; i++) {
        PageOutput += `<li class="page-item ${
          action == i ? "active" : ""
        }"><a class="page-link" href="/#/products//${i}/${action2}">${i}</a></li>`;
      }
      const result = productWithSort
        .map((product) => {
          return `<div class="col-xl-4 col-sm-6">
      <div class="product">
        <div class="product-image">
          ${
            product.status ? '<div class="ribbon ribbon-info">SALE</div>' : ""
          }<img class="img-fluid" src="${product.image}" alt="product"/>
          <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
            product.id
          }"></a>
            <div class="product-hover-overlay-buttons"><a class="btn btn-dark btn-buy" href="/#/products/${
              product.id
            }"><i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a>
            </div>
          </div>
        </div>
        <div class="py-2">
          <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
            product.id
          }">${
            product.name
          }</a></h3><span class="text-muted">${formatter.format(
            product.price
          )}</span>
        </div>
      </div>
    </div>`;
        })
        .join("");
      $("#product-list").innerHTML = `${result}
      `;
      $("#pagination").innerHTML = `
      <li class="page-item"><a class="page-link" href="/#/products//${
        action > 1 ? action - 1 : "1"
      }/${action2}" aria-label="Previous"><span aria-hidden="true">Prev</span><span class="sr-only">Previous</span></a></li>
      ${PageOutput}
      <li class="page-item"><a class="page-link" href="/#/products//${
        action < Pages ? parseInt(action) + 1 : Pages
      }/${action2}" aria-label="Next"><span aria-hidden="true">Next</span><span class="sr-only">Next</span></a></li>`;
      
      if(action2 == "id"){
        $(".hero-heading").innerHTML = "PRODUCTS NEWEST";
      }
      else{
        $(".hero-heading").innerHTML = "PRODUCTS";
      }
    }
  },
};
export default ProductsPage;
