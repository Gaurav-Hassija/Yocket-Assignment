const routeNotFound = (req, res) =>
  res.status(404).json({ message: "404! Route Doesn't Exist, Check URL !!" });

module.exports = {
  routeNotFound,
};
