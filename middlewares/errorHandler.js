module.exports = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send("malformatted id");
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};
