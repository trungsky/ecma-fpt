import { $, formatter, parseRequestUrl } from "../utils";
import CategoryApi from "../api/CategoryApi";
import ProductApi from "../api/ProductApi";
const CategoryPage = {
  async render() {
    const { data: products } = await ProductApi.getAll();
    const { id } = parseRequestUrl();
    const cateResult = products.filter((product) => {
      return product.category == id;
    });
    const { data: categories } = await CategoryApi.getAll();
    let result = "";
    if (cateResult.length == 0) {
      result = `<h3 class="text-center p-4">Không có sản phẩm nào</h3>`;
    } else {
      result = cateResult
        .map((product) => {
          return `    <div class="col-xl-4 col-sm-6">
        <div class="product">
          <div class="product-image">
            ${
              product.status ? '<div class="ribbon ribbon-info">SALE</div>' : ""
            }<img class="img-fluid" src="${product.image}" alt="product"/>
            <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
              product._id
            }"></a>
              <div class="product-hover-overlay-buttons"><a class="btn btn-outline-dark btn-product-left" href="#"><i class="fa fa-shopping-cart"></i></a><a class="btn btn-dark btn-buy" href="/#/products/${
                product._id
              }"><i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a><a class="btn btn-outline-dark btn-product-right" href="#" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-expand-arrows-alt"></i></a>
              </div>
            </div>
          </div>
          <div class="py-2">
            <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
              product._id
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

    return /*html*/ `
    <!-- Hero Section-->
    <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Category</li>
          <li id="breadcrumb-item" class="breadcrumb-item active">Category</li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Category</h1>
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
          </header>
          <div class="row">

          
            <!-- product-->
        ${result}
            <!-- /product-->
            
          </div>
          <nav class="d-flex justify-content-center mb-5 mt-3" aria-label="page navigation">
            <ul class="pagination">
              <li class="page-item"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">Prev</span><span class="sr-only">Previous</span></a></li>
              <li class="page-item active"><a class="page-link" href="#">1       </a></li>
              <li class="page-item"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">Next</span><span class="sr-only">Next     </span></a></li>
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
                  <a id="category_side" class="nav-link d-flex justify-content-between mb-2 ${
                    id == cate._id ? "active" : ""
                  }" href="/#/category/${cate._id}">
              <span>${cate.name}</span>
              </a>
                  `;
                })
                .join("")}
              
                  </div>
              </div>
            </div>
          </div>
          <div class="sidebar-block px-3 px-lg-0 mr-lg-4"><a class="d-lg-none block-toggler" data-toggle="collapse" href="#brandFilterMenu" aria-expanded="true" aria-controls="brandFilterMenu">Filter by brand</a>
            <!-- Size filter menu-->
            </div>
          </div>
        </div>
        <!-- /Sidebar end-->
      </div>
    </div>
    <!-- Quickview Modal    -->
    <div class="modal fade quickview" id="exampleModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <button class="close modal-close" type="button" data-dismiss="modal" aria-label="Close">
            <svg class="svg-icon w-100 h-100 svg-icon-light align-middle">
              <use xlink:href="#close-1"> </use>
            </svg>
          </button>
          <div class="modal-body"> 
            <div class="ribbon ribbon-primary">Sale</div>
            <div class="row">
              <div class="col-lg-6">
                <div class="owl-carousel owl-theme owl-dots-modern detail-full" data-slider-id="1">
                  <div class="detail-full-item-modal" style="background: center center url('https://d19m59y37dris4.cloudfront.net/sell/1-4/img/photo/kyle-loftus-596319-detail-1.jpg') no-repeat; background-size: cover;">  </div>
                  <div class="detail-full-item-modal" style="background: center center url('https://d19m59y37dris4.cloudfront.net/sell/1-4/img/photo/kyle-loftus-596319-detail-2.jpg') no-repeat; background-size: cover;">  </div>
                  <div class="detail-full-item-modal" style="background: center center url('https://d19m59y37dris4.cloudfront.net/sell/1-4/img/photo/kyle-loftus-596319-detail-3.jpg') no-repeat; background-size: cover;">  </div>
                  <div class="detail-full-item-modal" style="background: center center url('https://d19m59y37dris4.cloudfront.net/sell/1-4/img/photo/kyle-loftus-594535-unsplash-detail-3.jpg') no-repeat; background-size: cover;">  </div>
                  <div class="detail-full-item-modal" style="background: center center url('https://d19m59y37dris4.cloudfront.net/sell/1-4/img/photo/kyle-loftus-594535-unsplash-detail-4.jpg') no-repeat; background-size: cover;">  </div>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center">
                <div>
                  <h2 class="mb-4 mt-4 mt-lg-1">Modern Jacket</h2>
                  <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                    <ul class="list-inline mb-2 mb-sm-0">
                      <li class="list-inline-item h4 font-weight-light mb-0">$65.00</li>
                      <li class="list-inline-item text-muted font-weight-light"> 
                        <del>$90.00</del>
                      </li>
                    </ul>
                    <div class="d-flex align-items-center">
                      <ul class="list-inline mr-2 mb-0">
                        <li class="list-inline-item mr-0"><i class="fa fa-star text-primary"></i></li>
                        <li class="list-inline-item mr-0"><i class="fa fa-star text-primary"></i></li>
                        <li class="list-inline-item mr-0"><i class="fa fa-star text-primary"></i></li>
                        <li class="list-inline-item mr-0"><i class="fa fa-star text-primary"></i></li>
                        <li class="list-inline-item mr-0"><i class="fa fa-star text-gray-300"></i></li>
                      </ul><span class="text-muted text-uppercase text-sm">25 reviews</span>
                    </div>
                  </div>
                  <p class="mb-4 text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                  <form action="#">
                    <div class="row">
                      <div class="col-sm-6 col-lg-12 detail-option mb-3">
                        <h6 class="detail-option-heading">Size <span>(required)</span></h6>
                        <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_0"> Small
                          <input class="input-invisible" type="radio" name="size" value="value_0" id="size_0" required>
                        </label>
                        <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_1"> Medium
                          <input class="input-invisible" type="radio" name="size" value="value_1" id="size_1" required>
                        </label>
                        <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="size_2"> Large
                          <input class="input-invisible" type="radio" name="size" value="value_2" id="size_2" required>
                        </label>
                      </div>
                      <div class="col-sm-6 col-lg-12 detail-option mb-3">
                        <h6 class="detail-option-heading">Type <span>(required)</span></h6>
                        <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="material_0"> Hoodie
                          <input class="input-invisible" type="radio" name="material" value="value_0" id="material_0" required>
                        </label>
                        <label class="btn btn-sm btn-outline-secondary detail-option-btn-label" for="material_1"> College
                          <input class="input-invisible" type="radio" name="material" value="value_1" id="material_1" required>
                        </label>
                      </div>
                      <div class="col-12 detail-option mb-3">
                        <h6 class="detail-option-heading">Colour <span>(required)</span></h6>
                        <ul class="list-inline mb-0 colours-wrapper">
                          <li class="list-inline-item">
                            <label class="btn-colour" for="colour_Blue" style="background-color: #668cb9"> </label>
                            <input class="input-invisible" type="radio" name="colour" value="value_Blue" id="colour_Blue" required>
                          </li>
                          <li class="list-inline-item">
                            <label class="btn-colour" for="colour_White" style="background-color: #fff"> </label>
                            <input class="input-invisible" type="radio" name="colour" value="value_White" id="colour_White" required>
                          </li>
                          <li class="list-inline-item">
                            <label class="btn-colour" for="colour_Violet" style="background-color: #8b6ea4"> </label>
                            <input class="input-invisible" type="radio" name="colour" value="value_Violet" id="colour_Violet" required>
                          </li>
                          <li class="list-inline-item">
                            <label class="btn-colour" for="colour_Red" style="background-color: #dd6265"> </label>
                            <input class="input-invisible" type="radio" name="colour" value="value_Red" id="colour_Red" required>
                          </li>
                        </ul>
                      </div>
                      <div class="col-12 col-lg-6 detail-option mb-5">
                        <label class="detail-option-heading font-weight-bold">Items <span>(required)</span></label>
                        <input class="form-control detail-quantity" name="items" type="number" value="1">
                      </div>
                    </div>
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <button class="btn btn-dark btn-lg mb-1" type="submit"> <i class="fa fa-shopping-cart mr-2"></i>Add to Cart</button>
                      </li>
                      <li class="list-inline-item"><a class="btn btn-outline-secondary mb-1" href="#"> <i class="far fa-heart mr-2"></i>Add to wishlist</a></li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    const { data: categories } = await CategoryApi.getAll();

    categories.map((e) => {
      if (e._id == id) {
        $(".hero-heading").innerHTML = e.name;
        $("#breadcrumb-item").innerHTML = e.name;
      }
    });

    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });
  },
};
export default CategoryPage;
