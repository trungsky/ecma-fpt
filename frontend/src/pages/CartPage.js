import ProductApi from "../api/ProductApi";
import { $, reRender, formatter } from "../utils";
const CartPage = {
  async render() {
    const listProduct = JSON.parse(localStorage.getItem("itemsArray"));
    let output = "";
    if (listProduct != null) {
      output = listProduct
        .map((product, index) => {
          return `
        <div class="cart-item">
            <div class="row d-flex align-items-center text-center">
              <div class="col-5">
                <div class="d-flex align-items-center"><a href="/#/products/${
                  product.id
                }"><img class="cart-item-img" src="${
            product.image
          }" alt="..."></a>
          <div class="cart-title text-left"><a class="text-uppercase text-dark" href="/#/products/${
            product.id
          }"><strong>${
            product.name
          }</strong></a><br><span class="text-muted text-sm">Size: ${
            product.size
          }</span>
          
          </div>
                </div>
              </div>
              <div class="col-2">${formatter.format(product.price)}</div>
              <div class="col-2">
                <div class="d-flex align-items-center">
                  <input class="form-control text-center input-items" type="text" disabled value="${
                    product.quantity
                  }">
                </div>
              </div>
              <div class="col-2 text-center">
              <span>${formatter.format(product.price * product.quantity)}</span>
              <span id="total" hidden>${product.price * product.quantity}</span>
              </div>
              <div class="col-1 text-center">
              <button class="btn btn-secondary btn-remove" id="remove-product" data-id="${index}"><i class="fa fa-times"></i></button>
              </div>
            </div>
          </div>
        `;
        })
        .join("");
    } else {
      output = `<h3 class="text-center p-4">Không có sản phẩm nào trong giỏ cả</h3>`;
    }
    return /*html*/ `

<section class="hero">
<div class="container">
<!-- Breadcrumbs -->
<ol class="breadcrumb justify-content-center">
  <li class="breadcrumb-item"><a href="/#/">Home</a></li>
  <li class="breadcrumb-item active">Shopping cart        </li>
</ol>
<!-- Hero Content-->
<div class="hero-content pb-5 text-center">
  <h1 class="hero-heading">Shopping cart</h1>
  <div class="row">   
    <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">${
      listProduct != null
        ? `Bạn có ${listProduct.length} món trong cart`
        : "<h3 class='text-center'>Không có sản phẩm nào trong giỏ cả</h3>"
    }</p></div>
  </div>
</div>
</div>
</section>
<!-- Shopping Cart Section-->
<section>
<div class="container">
<div class="row mb-5"> 
  <div class="col-lg-8">
    <div  class="cart">
      <div class="cart-wrapper">
        <div class="cart-header text-center">
          <div class="row">
            <div class="col-5">Item</div>
            <div class="col-2">Price</div>
            <div class="col-2">Quantity</div>
            <div class="col-2">Total</div>
            <div class="col-1"></div>
          </div>
        </div>
        <div class="cart-body">
          <!-- Product-->
          <div id="trungsky">
          ${output}
          </div>
          <!-- Product-->
        </div>
      </div>
    </div>
    <div class="my-5 d-flex justify-content-between flex-column flex-lg-row"><a class="btn btn-link text-muted" href="/#/"><i class="fa fa-chevron-left"></i> Continue Shopping</a><a id="btn-checkout" class="btn btn-dark" href="/#/checkout">Proceed to checkout <i class="fa fa-chevron-right"></i>                                                     </a></div>
  </div>
  <div class="col-lg-4">
    <div class="block mb-5">
      <div class="block-header">
        <h6 class="text-uppercase mb-0">Order Summary</h6>
      </div>
      <div class="block-body bg-light pt-1">
        <p class="text-sm">Shipping and additional costs are calculated based on values you have entered.</p>
        <ul class="order-summary mb-0 list-unstyled">
          <li class="order-summary-item"><span>Order Subtotal </span><span class="subtotal">0đ</span></li>
          <li class="order-summary-item"><span>Shipping and handling</span><span class="shipfee">35.000đ</span></li>
          <li class="order-summary-item"><span>Tax</span><span>$0.00</span></li>
          <li class="order-summary-item border-0"><span>Total</span><strong class="order-summary-total">0đ</strong></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
</section>
        `;
  },
  afterRender() {
    const listProduct = JSON.parse(localStorage.getItem("itemsArray"));
    const btns = $("#remove-product");
    const totals = $("#total");
    if (totals.length >= 2) {
      const subtotal = $(".subtotal");
      const orderSummaryTotal = $(".order-summary-total");
      let totalToCheckOut = 0;
      totals.forEach((element) => {
        totalToCheckOut += parseInt(element.innerText);
      });
      subtotal.innerText = formatter.format(totalToCheckOut);
      orderSummaryTotal.innerText = formatter.format(totalToCheckOut + 35000);
      localStorage.setItem("priceTemp", totalToCheckOut);
    } else {
      let totalToCheckOut = 0;
      const subtotal = $(".subtotal");
      const orderSummaryTotal = $(".order-summary-total");
      totalToCheckOut += parseInt(totals.innerText);
      subtotal.innerText = formatter.format(totalToCheckOut);
      orderSummaryTotal.innerText = formatter.format(totalToCheckOut + 35000);
      localStorage.setItem("priceTemp", totalToCheckOut);
    }
    if (localStorage.getItem("itemsArray") == null) {
      $("#btn-checkout").classList.add("disabled");
    }
    if (btns.length >= 2) {
      btns.forEach((btn) => {
        const id = btn.dataset.id;
        btn.addEventListener("click", async function (e) {
          // e.preventDefault();
          if (btn.classList.contains("btn-remove")) {
            // const question = confirm("Xóa ko");
            // if (question) {
            await listProduct.splice(id, 1);
            localStorage.setItem("itemsArray", JSON.stringify(listProduct));
            // console.log(id);
            // await reRender(CartPage, "#trungsky");
            // }
            window.location.reload();
          }
        });
      });
    } else {
      const id = btns.dataset.id;
      btns.addEventListener("click", async function (e) {
        // e.preventDefault();
        if (btns.classList.contains("btn-remove")) {
          // const question = confirm("Xóa ko");
          // if (question) {
          await listProduct.splice(id, 1);
          localStorage.setItem("itemsArray", JSON.stringify(listProduct));
          // console.log(id);
          // await reRender(CartPage, "#trungsky");
          // }
          window.location.reload();
        }
      });
    }
  },
};
export default CartPage;
