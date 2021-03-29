import { $, getCookie } from "../utils";

const resStatus = getCookie("resStatus");
if (resStatus != undefined) {
  if (resStatus == "success") {
    toastr.success("Thao tác thành công nhé bủh!");
  } else if (resStatus == "error") {
    toastr.error("Thao tác lỗi rồi bủh!");
  } else if (resStatus == "nochange") {
    toastr.info("Không có gì thay đổi nha bủh!");
  } else if (resStatus == "sai-pass") {
    toastr.error("Sai pass rồi bủh ơi!");
  } else if (resStatus == "logout_ok") {
    toastr.error("Đăng xuất thành công nha bủh ơi!");
  }
}
    