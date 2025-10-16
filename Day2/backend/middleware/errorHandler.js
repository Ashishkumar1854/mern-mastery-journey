module.exports = (err, req, res, next) => {
  console.error(err); //log in error in backend
  if (err.name === "ValidationErro") {
    return res.status(400).json({ message: err.message }); // return readable validation errors
  }

  res.status(500).json({ message: "server error" }); // default server error
};
