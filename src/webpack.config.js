module.exports = {
  //...
  devServer: {
    headers: {
      "X-Frame-Options": "allow-from *",
      "Access-Control-Allow-Origin": "*",
    },
  },
};
