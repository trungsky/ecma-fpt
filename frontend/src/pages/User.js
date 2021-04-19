import axios from "axios";
import { $, formatter, getCookie } from "../utils";
import Logout from "../components/Logout";
import BillingApi from "../api/BillingApi";
import AdminMenu from "./AdminMenu";
const User = {
  async render() {
    if (getCookie("t") == undefined) {
      location.href = "/#/account";
    }

    const { data: getUser } = await axios.get(
      `http://localhost:8081/api/user/${localStorage.getItem("id")}`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("t")}`,
        },
      }
    );
    const user = getUser;

    const resStatus = getCookie("resStatus");
    if (resStatus != undefined) {
      if (resStatus == "login-ok") {
        toastr.success("Đăng nhập thành công nhé bủh!");
      }
      if (resStatus == "register_ok") {
        toastr.info("Đăng ký thành công nha bủh");
      }
    }

    const { data: billings } = await BillingApi.getAll();
    const getBill = billings
      .map((e) => {
        if (user._id == e.user) {
          const dateBill = new Date(e.date);
          return `
        <tr>
                <th class="py-4 align-middle"># ${e._id}</th>
                <td class="py-4 align-middle">${
                  dateBill.getDate() +
                  "-" +
                  (dateBill.getMonth() + 1) +
                  "-" +
                  dateBill.getFullYear()
                }</td>
                <td class="py-4 align-middle">${formatter.format(
                  parseInt(e.total) + 35000
                )}</td>
                <td class="py-4 align-middle"><span class="badge p-2 text-uppercase badge-info">${
                  e.status
                }</span></td>
                <td class="py-4 align-middle"><a class="btn btn-outline-dark btn-sm" href="/#/order/${
                  e._id
                }">View</a></td>
              </tr>
              `;
        }
      })
      .join("");

    // const user = getUser.filter((e) => e._id === getCookie("id"));
    // if (getCookie("id") == undefined) {
    //   alert("Bạn chưa đăng nhập");
    //   document.location.href = "/";
    // }
    const dateReg = new Date(user.createdAt);
    return /*html*/ `
    ${user.role == 1 ? `${await AdminMenu.render()}` : ""}
    <section class="hero">
    <div class="container">
      <!-- Breadcrumbs -->
      <ol class="breadcrumb justify-content-center">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item active">Orders        </li>
      </ol>
      <!-- Hero Content-->
      <div class="hero-content pb-5 text-center">
        <h1 class="hero-heading">Your orders</h1>
        <div class="row">   
          <div class="col-xl-8 offset-xl-2"><p class="lead">Your orders in one place.</p></div>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <table class="table table-borderless table-hover table-responsive-md">
            <thead class="bg-light">
              <tr>
                <th class="py-4 text-uppercase text-sm">Order #</th>
                <th class="py-4 text-uppercase text-sm">Date</th>
                <th class="py-4 text-uppercase text-sm">Total</th>
                <th class="py-4 text-uppercase text-sm">Status</th>
                <th class="py-4 text-uppercase text-sm">Action</th>
              </tr>
            </thead>
            <tbody>

            ${getBill}
              
            </tbody>
          </table>
        </div>
        <!-- Customer Sidebar-->
        <div class="col-xl-3 col-lg-4 mb-5">
          <div class="customer-sidebar card border-0"> 
            <div class="customer-profile"><img class="img-fluid rounded-circle customer-image" src="">
              <h4>${user.name}</h4>
              <p class="text">${user.email}</p>
              <p class="text-muted text-sm mb-0">Là thành viên từ: </br>
              
              ${
                (dateReg.getDate() < 10
                  ? "0" + dateReg.getDate()
                  : dateReg.getDate()) +
                "-" +
                (dateReg.getMonth() + 1 < 10
                  ? "0" + (dateReg.getMonth() + 1)
                  : dateReg.getMonth() + 1) +
                "-" +
                dateReg.getFullYear()
              }
              
              </p>
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
                  
                  <a class="list-group-item d-flex justify-content-between align-items-center" id="btnLogout" href="#"><span>
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
  async afterRender() {
    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });

    $("#btnLogout").addEventListener("click", async function (e) {
      e.preventDefault();
      Logout.render();
    });
  },
};
export default User;
