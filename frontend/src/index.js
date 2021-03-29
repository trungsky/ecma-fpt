import Homepage from "./pages/Home.js";
import ProductsPage from "./pages/ProductsPage.js";
import ProductDetailPage from "./pages/ProductDetail.js";
import Error404Page from "./pages/Error404Page.js";
import CategoryPage from "./pages/CategoryPage.js";
import { parseRequestUrl, $ } from "./utils.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ContactPage from "./pages/ContactPage.js";
import AboutPage from "./pages/AboutPage.js";
import ProductAddPage from "./pages/ProductAddPage.js";
import CategoryAddPage from "./pages/CategoryAddPage.js";
import AdminProductPage from "./pages/AdminProductPage.js";
import AdminCategoryPage from "./pages/AdminCategoryPage.js";
import CartPage from "./pages/CartPage.js";
import LoginPage from "./pages/LoginPage.js";
import AdminMenu from "./pages/AdminMenu.js";
import ProductEditPage from "./pages/ProductEditPage.js";
import User from "./pages/User.js";
import UserChangeInfo from "./pages/UserChangeInfo.js";
import Cart1 from "./pages/Cart1.js";
import OrderConfirm from "./pages/OrderConfirm.js";
import CategoryEditPage from "./pages/CategoryEditPage.js";
import Logout from "./components/Logout.js";
import OrderDetail from "./pages/OrderDetail.js";
import ListBilling from "./components/ListBilling.js";
import ListContact from "./components/ListContact.js";
import BillingEditPage from "./pages/BillingEditPage.js";
import BannerEditPage from "./pages/BannerEditPage.js";
import test from "./pages/test";
import ListUser from "./components/ListUser.js";
import UserEditPage from "./pages/UserEditPage.js";

const routes = {
  "/": Homepage,
  "/products": ProductsPage,
  "/products/:id": ProductDetailPage,
  "/category/:id": CategoryPage,
  "/contact": ContactPage,
  "/about": AboutPage,
  "/addproduct": ProductAddPage,
  "/addcategory": CategoryAddPage,
  "/listproduct": AdminProductPage,
  "/listcategory": AdminCategoryPage,
  "/editcategory/:id": CategoryEditPage,
  "/editbill/:id": BillingEditPage,
  "/cart": CartPage,
  "/account": LoginPage,
  "/AdminMenu": AdminMenu,
  "/editproduct/:id": ProductEditPage,
  "/edituser/:id": UserEditPage,
  "/editbanner": BannerEditPage,
  "/user": User,
  "/changeinfo": UserChangeInfo,
  "/checkout": Cart1,
  "/order-success": OrderConfirm,
  "/logout": Logout,
  "/order/:id": OrderDetail,
  "/listbilling": ListBilling,
  "/listcontact": ListContact,
  "/listuser": ListUser,
  "/test": test,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "");

  const page = routes[parseUrl] ? routes[parseUrl] : Error404Page;
  $("#header").innerHTML = await Header.render();
  $("#root").innerHTML = await page.render();
  $("#footer").innerHTML = await Footer.render();
  await page.afterRender();
};
window.addEventListener("DOMContentLoaded", router);
window.addEventListener("hashchange", router);
