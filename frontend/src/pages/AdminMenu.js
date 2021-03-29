const AdminMenu = {
  async render() {
    return /*html*/ `
    <nav class=" navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Product
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="/#/listproduct">List product</a></li>
                        <li><a class="dropdown-item" href="/#/addproduct">Add product</a></li>
                    </ul>
                </li>
            </ul>

            <ul class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="/#/listcategory">List category</a></li>
                        <li><a class="dropdown-item" href="/#/addcategory">Add category</a></li>
                    </ul>
                </li>
                <a class="nav-link" href="/#/listbilling">Billing</a>
                <a class="nav-link" href="/#/listcontact">Contact</a>
                <a class="nav-link" href="/#/editbanner">Banner</a>
              </li>

            </ul>
        </div>
    </div>
</nav>
    `;
  },
  afterRender() {},
};

export default AdminMenu;
