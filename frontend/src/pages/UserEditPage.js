import { parseRequestUrl, $, checkRole } from "../utils";
import UserApi from "../api/UserApi";
import AdminMenu from "./AdminMenu";
const UserEditPage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: users } = await UserApi.get(id);
    checkRole();
    return /*html*/ `
    ${await AdminMenu.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto p-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        <!-- End -->


        <!-- Credit card form content -->
        <div class="tab-content">

          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <p class="text-center text-xl">Chỉnh sửa user</p>
            <form id="form-update">
              <div class="form-group">
                <label for="user_id">ID user</label>
                <input type="text" id="user_id" placeholder="Tên sản phẩm" value="${
                  users._id
                }" disabled class="form-control">
              </div>
              <div class="form-group">
                <label for="user_name">Name</label>
                <div class="input-group">
                  <input type="text" id="user_name" placeholder="Input box" value="${
                    users.name
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
              <label for="user_email">Email</label>
              <div class="input-group">
                <input type="text" id="user_email" placeholder="Input box" value="${
                  users.email
                }" class="form-control" required>
              </div>
            </div>

            <div class="form-group">
            <label for="user_role">Role</label>
            <div class="input-group">
              <input type="text" id="user_role" placeholder="Input box" value="${
                users.role
              }" class="form-control" required>
            </div>
          </div>

              
              <button type="submit" class="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
            </form>
          </div>
          <!-- End -->
      </div>
    </div>
  </div>`;
  },
  async afterRender() {
    const { id } = parseRequestUrl();
    const { data: user } = await UserApi.get(id);
    $("#form-update").addEventListener("submit", async function (e) {
      // e.preventDefault();
      // const updateUser = {
      //   name: $("#user_name").value,
      //   email: $("#user_email").value,
      //   role: $("#user_role").value,
      // };
      UserApi.update(id);
      toastr.success("Update thành công!", "Thành công");
      // window.location.hash("/listproduct");
    });
  },
};

export default UserEditPage;
