import swal from "sweetalert";

export const Alert = (title, text, icon) => {
  swal({
    title,
    text,
    icon,
    button: "متوجه شدم",
  });
};

export const Confirm = (title, text) => {
  return swal({
    title,
    html: text,
    icon: "info",

    buttons: ["بازگشت", "تایید"],
    dangerMode: true,
  });
};
