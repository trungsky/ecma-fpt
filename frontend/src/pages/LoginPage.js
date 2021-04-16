import { $, getCookie } from "../utils";
const LoginPage = {
  async render() {
    const meo = getCookie("t");
    const resStatus = getCookie("resStatus");
    if (resStatus != undefined) {
      if (resStatus == "success") {
        toastr.success("Thao tác thành công nhé bủh!");
      } else if (resStatus == "error") {
        toastr.error("Thao tác lỗi rồi bủh!");
      } else if (resStatus == "nochange") {
        toastr.info("Không có gì thay đổi nha bủh!");
      } else if (resStatus == "sai-pass") {
        toastr.error("Sai pass rồi bủh ơi!");
      } else if (resStatus == "logout_ok") {
        toastr.warning("Đăng xuất thành công nha bủh ơi!");
      } else if (resStatus == "passwd-khong-hop-le") {
        toastr.error("Pass không hợp lệ nha bủh ơi!");
      } else if (resStatus == "user_registed") {
        toastr.error("User đã được đăng ký nha bủh!");
      } else if (resStatus == "user-not-found") {
        toastr.error("User hổng có trên hệ thống nha bủh!");
      }
    }
    const CCID = getCookie("id");
    if (CCID != undefined) {
      document.cookie = `resStatus=loged; max-age=5;`;
      location.href = "/#/user";
    }
    return /*html*/ `
      <section class="hero">
      <div class="container">
        <!-- Breadcrumbs -->
        <ol class="breadcrumb justify-content-center">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Customer zone        </li>
        </ol>
        <!-- Hero Content-->
        <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading mb-0">Customer zone</h1>
        </div>
      </div>
    </section>
    <!-- customer login-->
    <section>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">Login</h6>
              </div>
              <div class="block-body">
                <p class="lead">Already our customer?</p>
                <p class="text-muted">Login now bro</p>
                <hr>
                <form id="login_form" action="http://localhost:8081/api/signin" method="post">
                  <div class="form-group">
                    <label class="form-label" for="log_email">Email</label>
                    <input class="form-control" name="email" id="log_email" type="text">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="log_password">Password</label>
                    <input class="form-control" name="password" id="log_password" type="password">
                  </div>
                  <div class="form-group text-center">
                    <button class="btn btn-outline-dark" type="submit"><i class="fa fa-sign-in mr-2"></i> Log in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="block">
              <div class="block-header">
                <h6 class="text-uppercase mb-0">New account</h6>
              </div>
              <div class="block-body"> 
                <p class="lead">Not our registered customer yet?</p>
                <p class="text-muted">Register now bro, if have problem <a href="/#/contact">contact us</a>, our customer service center is working for you 24/7.</p>
                <hr>
                <form id="reg_form" action="http://localhost:8081/api/signup" method="post">
                  <div class="form-group">
                    <label class="form-label" for="reg_name">Name</label>
                    <input class="form-control" name="name" id="reg_name" type="text">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="reg_email">Email</label>
                    <input class="form-control" name="email" id="reg_email" type="text">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="reg_password">Password</label>
                    <input class="form-control" name="password" id="reg_password" type="password">
                  </div>
                  <div class="form-group">
                    <label class="form-label" for="reg_confirmPassword">Confirm password</label>
                    <input class="form-control" name="confirmPassword" id="reg_confirmPassword" type="password">
                  </div>
                  <div class="form-group text-center">
                    <button class="btn btn-outline-dark" type="submit"><i class="far fa-user mr-2"></i>Register                                </button>
                  </div>
                </form>
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
      e.preventDefault();
    });

    var mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    $("#login_form").addEventListener("submit", (e) => {
      if ($("#log_email").value == "") {
        toastr.error("Bủh còn chưa nhập email kìa ?");
        e.preventDefault();
      } else if (!$("#log_email").value.match(mailformat)) {
        toastr.error("Email nhập ko có đúng định dạng nha ?");
        e.preventDefault();
      } else if ($("#log_password").value == "") {
        toastr.error("Bủh còn chưa nhập pass kìa ?");
        e.preventDefault();
      }
    });

    $("#reg_form").addEventListener("submit", (e) => {
      if ($("#reg_name").value == "") {
        toastr.error("Bủh còn chưa nhập tên kìa ?");
        e.preventDefault();
      } else if ($("#reg_name").value.length < 3) {
        toastr.error("Tên gì ngắn vậy cha nội ?");
        e.preventDefault();
      } else if ($("#reg_email").value == "") {
        toastr.error("Bủh còn chưa nhập email kìa ?");
        e.preventDefault();
      } else if (!$("#reg_email").value.match(mailformat)) {
        toastr.error("Email nhập ko có đúng định dạng nha ?");
        e.preventDefault();
      } else if ($("#reg_password").value == "") {
        toastr.error("Bủh còn chưa nhập pass kìa ?");
        e.preventDefault();
      } else if ($("#reg_confirmPassword").value == "") {
        toastr.error("Bủh còn chưa nhập lại pass kìa ?");
        e.preventDefault();
      } else if ($("#reg_password").value != $("#reg_confirmPassword").value) {
        toastr.error("Nhập lại pass ko đúng bồ ơi ?");
        e.preventDefault();
      } else if ($("#reg_password").value.length < 6) {
        toastr.error("Pass phải hơn 6 ký tự nha bồ ?");
        e.preventDefault();
      }
    });
  },
};
export default LoginPage;
