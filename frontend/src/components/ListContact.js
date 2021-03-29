import ContactApi from "../api/ContactApi";
import { $, reRender, checkRole } from "../utils";
import AdminMenu from "../pages/AdminMenu";
const ListContact = {
  async render() {
    checkRole();
    const { data: contacts } = await ContactApi.getAll();
    return `
    ${await AdminMenu.render()}
    <div class="table-responsive">
    <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody id="list-message">
          ${contacts
            .map((message) => {
              return `
              <tr>
              <td>${message.id}</td>
              <td>${message.fullname}</td>
              <td>${message.email}</td>
              <td>${message.phone}</td>
              <td>${message.message}</td>
              <td><a href="mailto:${message.email}"><button class="btn btn-primary">Repmail</button></a>
              <button class="btn btnss btn-danger btn-remove" data-id="${message.id}">Delete</button>
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
    const btns = $("#list-message .btnss");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (btn.classList.contains("btn-remove")) {
          const question = confirm("Xóa ko");
          if (question) {
            await ContactApi.remove(id);
            await reRender(ListContact, "#list-message");
          }
        }
      });
    });
  },
};

export default ListContact;
