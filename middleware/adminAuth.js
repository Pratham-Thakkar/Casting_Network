exports.adminAuth = async (req, res, next) => {
  try {
    if (req.userType !== "admin")
      throw Error("Only admin can access this route");
    next();
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};
