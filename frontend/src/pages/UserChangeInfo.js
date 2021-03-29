import axios from "axios";
import { $, getCookie } from "../utils";
const UserChangeInfo = {
  async render() {
    const { data: getName } = await axios.get(
      "http://localhost:5000/api/getUser"
    );
    const user = getName.filter((e) => e._id === getCookie("id"));
    const dateReg = new Date(user[0].regAt);
    const datetime =
      dateReg.getHours() +
      ":" +
      dateReg.getMinutes() +
      " " +
      dateReg.getDate() +
      "/" +
      (dateReg.getMonth() + 1) +
      "/" +
      dateReg.getFullYear();
    if (getCookie("id") == undefined) {
      alert("Bạn chưa đăng nhập");
      document.location.href = "/";
    }
    const resStatus = getCookie("resStatus");
    if (resStatus != undefined) {
      if (resStatus == "success") {
        toastr.success("Thao tác thành công nhé bủh!");
      } else if (resStatus == "error") {
        toastr.error("Thao tác lỗi rồi bủh!");
      } else if (resStatus == "nochange") {
        toastr.info("Không có gì thay đổi nha bủh!");
      } else if (resStatus == "pass0") {
        toastr.error("Pass cũ sai nha bủh!");
      } else if (resStatus == "repass0") {
        toastr.error("Nhập lại pass bị sai bủh!");
      }
    }
    return /*html*/ `
    <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Your profile        </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Your profile</h1>
          <div class="row">   
            <div class="col-xl-8 offset-xl-2"><p class="lead text-muted">Maecenas sollicitudin. In rutrum. In convallis. Nunc tincidunt ante vitae massa. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Fusce dui leo, imperdiet in.</p></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-xl-9">
            <div class="block mb-5">
              <div class="block-header"><strong class="text-uppercase">Change your infomation</strong></div>
              <div class="block-body">
                <form action="http://localhost:5000/changepass/${
                  user[0]._id
                }" method="post">
                  <div class="row">
                  <input class="form-control" name="id" id="id" type="text" value="${
                    user[0]._id
                  }" hidden readonly>
                    
                  <div class="col-sm-6">
                      <div class="form-group">
                        <label class="form-label" for="fullname">Name</label>
                        <input class="form-control" name="fullname" value="${
                          user[0].name
                        }" id="fullname" type="text">
                      </div>
                    </div>


                  <div class="col-sm-6">
                      <div class="form-group">
                        <label class="form-label" for="old_pass">Old password</label>
                        <input class="form-control" name="old_pass" id="old_pass" type="password">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="form-label" for="new_pass1">New password</label>
                        <input class="form-control" name="new_pass1" id="new_pass1" type="password">
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label class="form-label" for="new_pass2">Retype new password</label>
                        <input class="form-control" name="new_pass2" id="new_pass2" type="password">
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-4">
                    <button class="btn btn-outline-dark" type="submit"><i class="far fa-save mr-2"></i>Submit nowwwww</button>
                  </div>
                </form>
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
            <nav class="list-group customer-nav"><a class="list-group-item d-flex justify-content-between align-items-center" href="/#/user"><span>
                  <svg class="svg-icon svg-icon-heavy mr-2">
                    <use xlink:href="#paper-bag-1"> </use>
                  </svg>Orders</span>
                <div class="badge badge-pill badge-light font-weight-normal px-3">5</div></a><a class="list-group-item d-flex justify-content-between align-items-center active" href="/#/changeinfo"><span>
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
export default UserChangeInfo;
