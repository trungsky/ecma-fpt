import { $, getCookie } from "../utils";
import ContactApi from "../api/ContactApi";
const ContactPage = {
  async render() {
    return /*html*/ `
    <!-- Hero Content-->
<section class="py-6" style="background: #fafafa;">   
  <div class="container">       
    <div class="row">
      <div class="col-md-4 text-center text-md-left">
        <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
          <use xlink:href="#navigation-map-1"> </use>
        </svg>
        <h4 class="ff-base">Address</h4>
        <p class="text-muted">13/25 New Avenue<br>New Heaven, 45Y 73J<br>England, <strong>Great Britain</strong></p>
      </div>
      <div class="col-md-4 text-center text-md-left">
        <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
          <use xlink:href="#audio-call-1"> </use>
        </svg>
        <h4 class="ff-base">Call center</h4>
        <p class="text-muted">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p class="text-muted"><strong>+33 555 444 333</strong></p>
      </div>
      <div class="col-md-4 text-center text-md-left">
        <svg class="svg-icon svg-icon-light text-primary w-3rem h-3rem mb-3">
          <use xlink:href="#mail-1"> </use>
        </svg>
        <h4 class="ff-base">Electronic support</h4>
        <p class="text-muted">Please feel free to write an email to us or to use our electronic ticketing system.</p>
        <ul class="list-unstyled text-muted">
          <li>info@sell.com</li>
          <li>support@sell.com</li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section class="py-6">
  <div class="container">
    <header class="mb-5">
      <h2 class="text-uppercase h5">Contact form</h2>
    </header>
    <div class="row">
      <div class="col-md-7 mb-5 mb-md-0">
        <form class="form" id="contact-form" method="post">
          <div class="controls">
            <div class="row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="fullname">Fullname *</label>
                  <input class="form-control" type="text" name="fullname" id="fullname" placeholder="Enter your fullname" required="required">
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label" for="phone">Phôn numbơ *</label>
                  <input class="form-control" type="text" name="phone" id="phone" placeholder="Enter your  phone" required="required">
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label" for="email">Your email *</label>
              <input class="form-control" type="email" name="email" id="email" placeholder="Enter your  email" required="required">
            </div>
            <div class="form-group">
              <label class="form-label" for="message">Your message for us *</label>
              <textarea class="form-control" rows="4" name="message" id="message" placeholder="Enter your message" required="required"></textarea>
            </div>
            <button class="btn btn-outline-dark" type="submit">Send message</button>
          </div>
        </form>
      </div>
      <div class="col-md-5">
        <p class="text-muted">Effects present letters inquiry no an removed or friends. Desire behind latter me though in. Supposing shameless am he engrossed up additions. My possible peculiar together to. Desire so better am cannot he up before points. Remember mistaken opinions it pleasure of debating. Court front maids forty if aware their at. Chicken use are pressed removed. </p>
        <p class="text-muted">Able an hope of body. Any nay shyness article matters own removal nothing his forming. Gay own additions education satisfied the perpetual. If he cause manor happy. Without farther she exposed saw man led. Along on happy could cease green oh. </p>
        <div class="social">
          <ul class="list-inline">
            <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-pinterest"></i></a></li>
            <li class="list-inline-item"><a href="#" target="_blank"><i class="fab fa-vimeo"></i></a></li>
          </ul>
        </div>
      </div>
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

    $("#contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newContact = {
        fullname: $("#fullname").value,
        phone: $("#phone").value,
        email: $("#email").value,
        message: $("#message").value,
      };

      ContactApi.add(newContact);
      document.cookie = `resStatus=success; max-age=5;`;
    });

    const resStatus = getCookie("resStatus");
    if (resStatus != undefined) {
      if (resStatus == "success") {
        toastr.success("Liên hệ thành công nhé bủh!");
      }
    }
  },
};
export default ContactPage;
