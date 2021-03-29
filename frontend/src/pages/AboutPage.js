import {$} from '../utils';
const AboutPage = {
  async render() {
    return /*html*/ `
      <div class="hero-content pb-5 text-center">
          <h1 class="hero-heading">Giới thiệu về chúng tôi</h1>
        </div>
      </div>
    </section>
    <div class="container-fluid">
      <div class="row px-xl-5">
        <div class="col-lg-2">
          <div class="sticky-top mb-5" style="top: 120px;">
            <div class="sidebar-block">
              <h6 class="sidebar-heading">Documentation</h6>
              <nav class="nav nav-pills flex-column"><a class="nav-link mb-2 active" href="../docs/docs-introduction.html">Introduction  </a><a class="nav-link mb-2" href="../docs/docs-directory-structure.html">Directory structure  </a><a class="nav-link mb-2" href="../docs/docs-gulp.html">Gulp  </a><a class="nav-link mb-2" href="../docs/docs-customizing-css.html">Customizing CSS  </a><a class="nav-link mb-2" href="../docs/docs-credits.html">Credits  </a><a class="nav-link mb-2" href="../docs/docs-changelog.html">Changelog  </a>
              </nav>
            </div>
            <div class="sidebar-block">
              <h6 class="sidebar-heading">Components</h6>
              <nav class="nav nav-pills flex-column"><a class="nav-link mb-2" href="../docs/components-bootstrap.html">Bootstrap  </a><a class="nav-link mb-2" href="../docs/components-sell.html">Theme  </a><a class="nav-link mb-2" href="../component-variants/header.html">Header variants <span class="badge badge-warning ml-1">New</span>  </a>
              </nav>
            </div>
          </div>
        </div>
        <div class="col-lg-10 col-xl-8 docs-content">
          <div class="text-lg">
            <p>Hey, welcome to the <strong>Sell Theme official documentation</strong>. </p>
            <p>If you own a theme’s license already, thank you very much for purchasing! If not yet, you can <a href="https://themes.getbootstrap.com/product/sell-bootstrap-4-e-commerce-template/">buy the theme’s license here</a>.</p>
            <p>This documentation is to help you with template’s customization. Basic HTML and CSS knowledge is required to customize this template. </p>
            <hr class="my-5">
          </div>
          <h5 class="text-uppercase mb-5">Theme info</h5>
          <p><span class="text-uppercase text-muted">Item Name:</span> Sell</p>
          <p><span class="text-uppercase text-muted">Author:</span> Bootstrapious</p>
          <p><span class="text-uppercase text-muted">Contact email for support & pre-sale questions: </span><a class="text-dark" href="mailto:hello@bootstrapious.com">hello@bootstrapious.com</a></p>
        </div>
      </div>
    </div>
      `;
  },afterRender() {
    $("#cartDrop").addEventListener("click", async function (e) {
      $("#showCart").classList.toggle("show");
      $("#showCart1").classList.toggle("show");
    });
  }
};
export default AboutPage;
