import { $, reRender } from "../utils";
import AdminMenu from "../pages/AdminMenu";
import UserApi from "../api/UserApi";

const ListUser = {
  async render() {
    const { data: users } = await UserApi.getAll();
    return `
    ${await AdminMenu.render()}
    <div class="table-responsive">
    <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Reg at</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody id="list-user">
          ${users
            .map((user) => {
              return `
              <tr>
              <td>${user._id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>${user.regAt.substring(0, 10)}</td>
              <td><a href="/#/edituser/${
                user._id
              }"><button class="btn btn-primary">Edit</button></a>
              <button class="btn btnss btn-danger btn-remove" data-id="${
                user._id
              }">Delete</button>
              </td>
            </tr>
              `;
            })
            .join("")}
          </tbody>
        </table>
        </div>
        `;
  },
  async afterRender() {
    const btns = $("#list-user .btnss");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (btn.classList.contains("btn-remove")) {
          const question = confirm("Xóa ko");
          if (question) {
            await UserApi.remove(id);
            await reRender(ListUser, "#list-user");
          }
        }
      });
    });
  },
};

export default ListUser;
