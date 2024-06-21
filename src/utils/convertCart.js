const convertCart = (prop) => {
  var _val = "";
  if (prop.isLock) {
    _val =
      prop.cartNo.substring(0, 4) +
      " **** **** " +
      prop.cartNo.substring(12, 16);
  } else {
    _val =
      prop.cartNo.substring(0, 4) +
      " " +
      prop.cartNo.substring(4, 8) +
      " " +
      prop.cartNo.substring(8, 12) +
      " " +
      prop.cartNo.substring(12, 16);
  }

  return _val;
};
export default convertCart;
