import Error404Page from "./pages/Error404Page.js";
import CategoryApi from "./api/CategoryApi";
import axios from "axios";
export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    id: request[2],
    action: request[3],
    action2: request[4],
  };
};

export const parseParamsUrl = () => {
  const { action } = parseRequestUrl();
  const params = action.split("&");
  // return params.map((e)=>{
  //   return e
  // })
  const [param1, param2] = params;
  const p1 = param1.split("=");
  const p2 = param2.split("=");
  return {
    param1: p1,
    param2: p2,
  };
  // const param = params.toString();
};

export const $ = (selector) => {
  const elements = document.querySelectorAll(selector);
  return elements.length == 1 ? elements[0] : elements;
};

export const reRender = async (component, position = "") => {
  if (position) {
    $(position).innerHTML = await component.render();
  } else {
    $("#main-content").innerHTML = await component.render();
  }
  await component.afterRender();
};

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const getCookie = function (name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const checkRole = async function () {
  const { data: getUser } = await axios.get(
    "http://localhost:5000/api/getUser"
  );
  const user = await getUser.filter((e) => e._id === getCookie("id"));

  if (user.length != 0) {
    if (user[0].role == 0) {
      toastr.error("Không có quyền truy cập");
      window.location.href = "http://localhost:8080/#/user";
    } else if (user[0].role == 1) {
      toastr.info("Hello admin");
      console.log("Hello admin");
    }
  } else {
    window.location.href = "http://localhost:8080/#/";
  }
  console.log("check role");
};

export const getCateName = async (id) => {
  const { data: categoryName } = await CategoryApi.get(id);
  return categoryName.name;
};
