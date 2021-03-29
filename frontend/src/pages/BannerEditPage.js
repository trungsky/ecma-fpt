import { parseRequestUrl, $, checkRole } from "../utils";
import BannerApi from "../api/BannerApi";
import AdminMenu from "./AdminMenu";
const BannerEditPage = {
  async render() {
    const { id } = parseRequestUrl();
    const { data: banner } = await BannerApi.getAll();
    console.log(banner);
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
            <p class="text-center text-xl">Chỉnh sửa banner</p>
            <form role="form" id="form-update">
              <div class="form-group">
                <label for="hero_text">Top text</label>
                <input type="text" id="hero_text" placeholder="Hero text" value="${
                  banner.hero_text
                }" class="form-control">
              </div>
              <div class="form-group">
                <label for="hero_title">Hero title</label>
                <div class="input-group">
                  <input type="text" id="hero_title" placeholder="Hero title" value="${
                    banner.hero_title
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label for="hero_desc">Hero description</label>
                <div class="input-group">
                  <input type="text" id="hero_desc" placeholder="Heor desc" value="${
                    banner.hero_desc
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
                <label for="img">Image Background</label>
                <div class="input-group">
                  <input type="text" id="img" placeholder="Img" value="${
                    banner.img
                  }" class="form-control" required>
                </div>
              </div>

              <div class="form-group">
              <label for="btn_title">Button title</label>
              <div class="input-group">
                <input type="text" id="btn_title" placeholder="Button title" value="${
                  banner.btn_title
                }" class="form-control" required>
              </div>
            </div>


              <div class="form-group">
                <label for="btn_url">Button url</label>
                <div class="input-group">
                  <input type="text" id="btn_url" placeholder="Button url" value="${
                    banner.btn_url
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
    const { data: banner } = await BannerApi.getAll();
    $("#form-update").addEventListener("submit", async function (e) {
      e.preventDefault();

      const newBanner = {
        img: $("#img").value,
        hero_text: $("#hero_text").value,
        hero_title: $("#hero_title").value,
        hero_desc: $("#hero_desc").value,
        btn_title: $("#btn_title").value,
        btn_url: $("#btn_url").value,
      };
      
      BannerApi.update(newBanner);
      toastr.success("Update thành công!", "Thành công");
      // window.location.hash("/listproduct");
    });
  },
};

export default BannerEditPage;
