const Logout = {
  async render() {
    var delete_cookie = function (name) {
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };
    delete_cookie("t");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    document.cookie = `resStatus=logout_ok; max-age=5;`;
    location.href = "/#/account";

  },
  async afterRender() {},
};

export default Logout;
