import Cookies from "js-cookie";

const deleteFromCookie = (names: string[]) => {
  names.forEach((name) => {
    Cookies.remove(name);
  });
};

export default deleteFromCookie;
