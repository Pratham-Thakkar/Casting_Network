exports.cdAuth = async (req, res, next) => {
  try {
    if (req.userType !== "cd") throw Error("Only cd can access this route");
    next();
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};
