import { $, formatter, parseRequestUrl, getCookie } from "../utils";
import BillingApi from "../api/BillingApi";
import axios from "axios";

const OrderDetail = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: getBill } = await BillingApi.get(id);
    const date = new Date(getBill.date);
    const { data: getUser } = await axios.get(
        "http://localhost:5000/api/getUser"
      );
    const user = getUser.filter((e) => e._id === getCookie("id"));
    const dateReg = new Date(user[0].regAt);

    const datetime =
      date.getHours() +
      ":" +
      date.getMinutes() +
      " " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear();
    const products = getBill.item
      .map((product) => {
        return `
      <div class="cart-item">
                  <div class="row d-flex align-items-center text-center">
                    <div class="col-6">
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
                    <div class="col-2">${product.quantity}
                    </div>
                    <div class="col-2 text-center">${formatter.format(
                      product.price * product.quantity
                    )}</div>
                  </div>
                </div>`;
      })
      .join("");
    return /*html*/ `
    <section class="hero">
    <div class="container">
      <!-- Breadcrumbs -->
      <ol class="breadcrumb justify-content-center">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="customer-orders.html">Orders</a></li>
        <li class="breadcrumb-item active">Order #${getBill.id}        </li>
      </ol>
      <!-- Hero Content-->
      <div class="hero-content pb-5 text-center">
        <h1 class="hero-heading">Order #${getBill.id}</h1>
        <div class="row">   
          <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Order #${
            getBill.id
          } was placed on <strong>${datetime}</strong> and is currently <strong>${
      getBill.status
    }</strong>.</p><p class="text-muted">If you have any questions, please feel free to <a href="/#/contact">contact us</a>, our customer service center is working for you 24/7.</p></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <div class="cart">
            <div class="cart-wrapper">
              <div class="cart-header text-center">
                <div class="row">
                  <div class="col-6">Item</div>
                  <div class="col-2">Price</div>
                  <div class="col-2">Quantity</div>
                  <div class="col-2">Total</div>
                </div>
              </div>
              <div class="cart-body">
                <!-- Product-->
                ${products}
              </div>
            </div>
          </div>
          <div class="row my-5">
            <div class="col-md-6">
              <div class="block mb-5">
                <div class="block-header">
                  <h6 class="text-uppercase mb-0">Order Summary</h6>
                </div>
                <div class="block-body bg-light pt-1">
                  <p class="text-sm">Shipping and additional costs are calculated based on values you have entered.</p>
                  <ul class="order-summary mb-0 list-unstyled">
                    <li class="order-summary-item"><span>Order Subtotal </span><span>${formatter.format(
                      getBill.total
                    )}</span></li>
                    <li class="order-summary-item"><span>Shipping and handling</span><span>${formatter.format(
                      35000
                    )}</span></li>
                    <li class="order-summary-item"><span>Tax</span><span>$0.00</span></li>
                    <li class="order-summary-item border-0"><span>Total</span><strong class="order-summary-total">${formatter.format(
                      parseInt(getBill.total) + 35000
                    )}</strong></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Invoice address</h6>
              </div>
              <div class="block-body bg-light pt-1">
                <p><strong>Name:</strong> ${getBill.fullname}
                <br><strong>Email:</strong> ${getBill.email}
                <br><strong>Phone:</strong> ${getBill.phone}
                <br><strong>Street:</strong> ${getBill.street}
                <br><strong>City:</strong> ${getBill.city}
                <br><strong>State:</strong> ${getBill.state}
                <br><strong>Postcode:</strong> ${getBill.postcode}
                <br>
                
              </div>

            </div>
          </div>
        </div>
        <!-- Customer Sidebar-->
        <div class="col-xl-3 col-lg-4 mb-5">
          <div class="customer-sidebar card border-0"> 
            <div class="customer-profile"><img class="img-fluid rounded-circle customer-image" src="${user[0].avatar}">
              <h5>${user[0].name}</h5>
              <p class="text-muted text-sm mb-0">Là thành viên từ: </br>${
                dateReg.getDate() +
                "-" +
                (dateReg.getMonth() + 1) +
                "-" +
                dateReg.getFullYear()
              }</p>
            </div>
            <nav class="list-group customer-nav"><a class="active list-group-item d-flex justify-content-between align-items-center" href="/#/user"><span>
                  <svg class="svg-icon svg-icon-heavy mr-2">
                    <use xlink:href="#paper-bag-1"> </use>
                  </svg>Orders</span>
                <div class="badge badge-pill badge-light font-weight-normal px-3">5</div></a><a class="list-group-item d-flex justify-content-between align-items-center" href="/#/changeinfo"><span>
                  <svg class="svg-icon svg-icon-heavy mr-2">
                    <use xlink:href="#male-user-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="paper-bag-1">
    <title>Paper Bag</title>
    <desc>A line styled icon from Orion Icon Library.</desc>
    <path data-name="layer2" fill="none" stroke="#202020" stroke-miterlimit="10" d="M8 22h48v40H8z" stroke-linejoin="round" stroke-linecap="round" style="stroke:var(--layer1, #202020)"></path>
    <path data-name="layer1" d="M22 26V12A10 10 0 0 1 32 2a10 10 0 0 1 10 10v14" fill="none" stroke="#202020" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" style="stroke:var(--layer1, #202020)"></path>
  </svg></use>
                  </svg>Change infomation</span></a>
                  
                  <a class="list-group-item d-flex justify-content-between align-items-center" id="btnLogout" href="/#/logout"><span>
                  <svg class="svg-icon svg-icon-heavy mr-2">
                    <use xlink:href="#exit-1"><svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" id="exit-1">
                    <title>Exit</title>
                    <desc>A line styled icon from Orion Icon Library.</desc>
                    <path d="M22 48h16V4H2v43l20 14V19L2 4" stroke-miterlimit="10" stroke-linecap="round" stroke="#202020" fill="none" data-name="layer2" stroke-linejoin="round"></path>
                    <path d="M32 26h29M51 16l10 10-10 10" stroke-miterlimit="10" stroke-linecap="round" stroke="#202020" fill="none" data-name="layer1" stroke-linejoin="round"></path>
                  </svg></use>
                  </svg>Log out</span></a>
            </nav>
          </div>
        </div>
        <!-- /Customer Sidebar-->
      </div>
    </div>
  </section>
      `;
  },
  afterRender() {
    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });
  },
};
export default OrderDetail;
