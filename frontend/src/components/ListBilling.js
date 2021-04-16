import BillingApi from "../api/BillingApi";
import { $, formatter, reRender } from "../utils";
import AdminMenu from "../pages/AdminMenu";
const ListBilling = {
  async render() {
    const { data: billing } = await BillingApi.getAll();
    return `
    ${await AdminMenu.render()}
    <div class="table-responsive">
    <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Status</th>
              <th>Buyer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="list-billing">
          ${billing
            .map((bill) => {
              return `
              <tr>
              <td>${bill._id}</td>
              <td>${bill.fullname}</td>
              <td>${bill.email}</td>
              <td>${bill.phone}</td>
              <td>${bill.street}</td>
              <td>${bill.city}</td>
              <td>${bill.state}</td>
              <td>${bill.status}</td>
              <td>${bill.user == null ? "User" : "Guest"}</td>
              <td><a href="/#/editbill/${
                bill._id
              }"><button class="btn btn-primary">Update</button></a>
              <button class="btn btnss btn-danger btn-remove" data-id="${
                bill._id
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
    const btns = $("#list-billing .btnss");
    btns.forEach((btn) => {
      const id = btn.dataset.id;
      btn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (btn.classList.contains("btn-remove")) {
          const question = confirm("Xóa ko");
          if (question) {
            await BillingApi.remove(id);
            await reRender(ListBilling, "#list-billing");
          }
        }
      });
    });
  },
};

export default ListBilling;
