import { $, formatter, getCookie } from "../utils";
import BillingApi from "../api/BillingApi";
import ProductApi from "../api/ProductApi";
import axios from "axios";
const Cart1 = {
  async render() {
    return /*html*/ `
    <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><a href="/#/cart">Home</a></li>
          <li class="breadcrumb-item active">Checkout        </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Checkout</h1>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Please fill in your address.</p></div>
          </div>
        </div>
      </div>
    </section>
    <!-- Checkout-->
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <form id="invoice">
              <div class="block">
                <!-- Invoice Address-->
                <div class="block-header">
                  <h6 class="text-uppercase mb-0">Invoice address                    </h6>
                </div>
                <div class="block-body">
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label class="form-label" for="fullname">Full Name</label>
                      <input class="form-control" type="text" name="fullname" placeholder="Joe Black" id="fullname">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_email">Email Address</label>
                      <input class="form-control" type="text" name="email" placeholder="joe.black@gmail.com" id="invoice_email">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_street">Street</label>
                      <input class="form-control" type="text" name="street" placeholder="123 Main St." id="invoice_street">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_city">City</label>
                      <input class="form-control" type="text" name="city" placeholder="City" id="invoice_city">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_postcode">Postcode</label>
                      <input class="form-control" type="text" name="postcode" placeholder="Postal code" id="invoice_postcode">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_state">State</label>
                      <input class="form-control" type="text" name="state" placeholder="State" id="invoice_state">
                    </div>
                    <div class="form-group col-md-6">
                      <label class="form-label" for="invoice_phone">Phone Number</label>
                      <input class="form-control" type="text" name="phone" placeholder="Phone Number" id="invoice_phone">
                    </div>
                  </div>
                  <!-- /Invoice Address-->
                </div>
              </div>
              <div class="mb-5 d-flex justify-content-between flex-column flex-lg-row"><a class="btn btn-link text-muted" href="/#/cart"> <i class="fa fa-angle-left mr-2"></i>Back </a>
              <button class="btn btn-dark" type="submit">Submitttt<i class="fa fa-angle-right ml-2"></i></button>
              </div>
            </form>
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
  async afterRender() {
    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });

    // const { data: listUser } = await axios.get(
    //   "http://localhost:8081/api/secret/getUser"
    // );

    if (localStorage.getItem("itemsArray") == null) {
      toastr.error("Chưa có sản phẩm sao mà pay ?");
      // $("#btn-checkout").classList.add("disabled");
      // location.href = "/#/cart";
    }
    var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var phoneformat = /((09|03|07|08|05)+([0-9]{8})\b)/;

    $("#invoice").addEventListener("submit", async (e) => {
      if ($("#fullname").value == "") {
        toastr.error("Bủh còn chưa nhập tên kìa ?");
        e.preventDefault();
      } else if ($("#invoice_email").value == "") {
        toastr.error("Bủh còn chưa nhập email kìa ?");
        e.preventDefault();
      } else if (!$("#invoice_email").value.match(mailformat)) {
        toastr.error("Email nhập ko có đúng định dạng nha ?");
        e.preventDefault();
      } else if (
        $("#invoice_street").value == "" ||
        $("#invoice_city").value == "" ||
        $("#invoice_postcode").value == "" ||
        $("#invoice_state").value == ""
      ) {
        toastr.error("Nhập đủ thông tin địa chỉ vào nha bro");
        e.preventDefault();
      } else if ($("#invoice_phone").value == "") {
        toastr.error("Chưa nhập phone num bờ ?");
        e.preventDefault();
      } else if (!$("#invoice_phone").value.match(phoneformat)) {
        toastr.error("SDT nhập ko đúng định dạng nha bồ ?");
        e.preventDefault();
      } else {
        if (getCookie("id") == "" || getCookie("id") == undefined) {
          const itemArray = JSON.parse(localStorage.getItem("itemsArray"));
          e.preventDefault();
          const billDetail = {
            fullname: $("#fullname").value,
            email: $("#invoice_email").value,
            street: $("#invoice_street").value,
            city: $("#invoice_city").value,
            postcode: $("#invoice_postcode").value,
            state: $("#invoice_state").value,
            phone: $("#invoice_phone").value,
            total: localStorage.getItem("priceTemp"),
            user: null,
            status: "Đặt hàng",
            date: Date.now(),
            item: itemArray,
          };
          console.log(billDetail);
          await BillingApi.add(billDetail);
          localStorage.clear();
          location.href = "/#/order-success";
        } else {
          const itemArray = JSON.parse(localStorage.getItem("itemsArray"));
          e.preventDefault();
          const billDetail = {
            fullname: $("#fullname").value,
            email: $("#invoice_email").value,
            street: $("#invoice_street").value,
            city: $("#invoice_city").value,
            postcode: $("#invoice_postcode").value,
            state: $("#invoice_state").value,
            phone: $("#invoice_phone").value,
            total: localStorage.getItem("priceTemp"),
            user: getCookie("id"),
            status: "Đặt hàng",
            date: Date.now(),
            item: itemArray,
          };
          await BillingApi.add(billDetail);
          localStorage.clear();
          location.href = "/#/order-success";
        }
      }
    });

    const subtotal = $(".subtotal");
    const orderSummaryTotal = $(".order-summary-total");
    subtotal.innerText = formatter.format(localStorage.getItem("priceTemp"));
    orderSummaryTotal.innerText = formatter.format(
      parseInt(localStorage.getItem("priceTemp")) + 35000
    );
  },
};
export default Cart1;
