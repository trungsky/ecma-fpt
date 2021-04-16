import { parseRequestUrl, $ } from "../utils";
import ProductApi from "../api/ProductApi";
import CategoryApi from "../api/CategoryApi";
import BillingApi from "../api/BillingApi";
import AdminMenu from "./AdminMenu";
const BillingEditPage = {
  async render() {
    const { id } = parseRequestUrl();
    // const { data: products } = await ProductApi.get(id);
    const { data: categories } = await CategoryApi.getAll();
    const { data: bill } = await BillingApi.get(id);
    return /*html*/ `
    ${await AdminMenu.render()}
    <div class="row">
    <div class="col-lg-7 mx-auto my-5">
      <div class="bg-white rounded-lg shadow-sm p-5">
        <!-- Credit card form tabs -->
        <!-- End -->


        <!-- Credit card form content -->
        <div class="tab-content">

          <!-- credit card info-->
          <div id="nav-tab-card" class="tab-pane fade show active">
            <p class="text-center text-xl">Chỉnh sửa bill: ${bill._id}</p>
            <form role="form" id="form-update">
              <div class="form-group">
                <label for="bill-id">ID Bill</label>
                <input type="text" id="bill-id" placeholder="ID Bill" value="${
                  bill._id
                }" disabled class="form-control">
              </div>
              <div class="form-group">
                <label for="bill-fullname">Fullname</label>
                <div class="input-group">
                  <input type="text" id="bill-fullname" placeholder="Your card number" value="${
                    bill.fullname
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-email">Email</label>
                <div class="input-group">
                  <input type="text" id="bill-email" placeholder="Your card number" value="${
                    bill.email
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-street">Street</label>
                <div class="input-group">
                  <input type="text" id="bill-street" placeholder="Your card number" value="${
                    bill.street
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-city">City</label>
                <div class="input-group">
                  <input type="text" id="bill-city" placeholder="Your card number" value="${
                    bill.city
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-state">State</label>
                <div class="input-group">
                  <input type="text" id="bill-state" placeholder="Your card number" value="${
                    bill.state
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-phone">Phone</label>
                <div class="input-group">
                  <input type="text" id="bill-phone" placeholder="Your card number" value="${
                    bill.phone
                  }" class="form-control" required>
                </div>
              </div>
              <div class="form-group">
                <label for="bill-status">Status</label>
                <div class="input-group">
                  <input type="text" id="bill-status" placeholder="Your card number" value="${
                    bill.status
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label for="bill-user">User</label>
                <div class="input-group">
                  <input type="text" id="bill-user" placeholder="Your card number" value="${
                    bill.user
                  }" class="form-control" disabled>
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
    const { data: bill } = await BillingApi.get(id);
    $("#form-update").addEventListener("submit", async function (e) {
      e.preventDefault();
      const newBill = {
        id: bill._id,
        fullname: $("#bill-fullname").value,
        street: $("#bill-street").value,
        city: $("#bill-city").value,
        state: $("#bill-state").value,
        email: $("#bill-email").value,
        phone: $("#bill-phone").value,
        status: $("#bill-status").value,
        user: $("#bill-user").value,
      };
      BillingApi.update(id, newBill);
      toastr.success("Update thành công!", "Thành công");
    });
  },
};

export default BillingEditPage;
