import { $, formatter } from "../utils";
import ProductApi from "../api/ProductApi";
import BannerApi from "../api/BannerApi";
const HomePage = {
  async render() {
    const { data: products } = await ProductApi.homeItems();
    const { data: banner } = await BannerApi.getAll();
    const result = `${products
      .map(
        (item) => `
        <div class="col-xl-4 col-sm-6">
        <div class="product">
          <div class="product-image">
            ${item.status ? "<div class='ribbon ribbon-info'>SALE</div>" : ""}
            <img class="img-fluid" src="${item.photo}" alt="product">
            <div class="product-hover-overlay"><a class="product-hover-overlay-link" href="/#/products/${
              item._id
            }"></a>
              <div class="product-hover-overlay-buttons"><a class="btn btn-dark btn-buy" href="/#/products/${
                item._id
              }"><i class="fa-search fa"></i><span class="btn-buy-label ml-2">View</span></a>
              
              </div>
            </div>
          </div>
          <div class="py-2">
            <h3 class="h6 text-uppercase mb-1"><a class="text-dark" href="/#/products/${
              item._id
            }">${item.name}</a></h3><span class="text-muted">${formatter.format(
          item.price
        )}</span>
          </div>
        </div>
      </div>
        `
      )
      .join("")}`;
    return `
    <section class="pb-5">
      <!-- Hero Slider-->
      <div class="owl-carousel owl-theme owl-dots-modern home-slider owl-loaded owl-drag">
      <div class="owl-stage-outer">
        <div class="owl-item active" style="width: 100%;"><div class="item d-flex align-items-center" style="background: rgb(248, 213, 207); height: 639.188px;">
        <img class="bg-image" src="${banner.img}" alt="">
          <div class="container py-6">
            <div class="row">
              <div class="col-lg-8 col-xl-6 mx-auto text-white text-center">
                <h5 id="banner-hero-text" class="text-uppercase text-white font-weight-light mb-4 letter-spacing-5"> ${await banner.hero_text}</h5>
                <h1 id="banner-hero-title" class="mb-5 display-2 font-weight-bold text-serif">${
                  banner.hero_title
                }</h1>
                <p id="banner-hero-desc" class="lead mb-4">${
                  banner.hero_desc
                }</p>
                <p> <a class="btn btn-light" href="${banner.btn_url}">${
      banner.btn_title
    }</a></p>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div></div></div>
        </div>
    </section>
      <div class="container">
      <div class="col-xl-8 mx-auto text-center mb-5">
            <h2 class="text-uppercase">NEW PRODUCTS 2021 </h2>
            <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
    <div class="row">
      ${result}
    </div>
    </div>
      `;
  },
  afterRender() {
    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });
  },
};
export default HomePage;
