const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  try {
    let token = req.get("Authorization");
    if (!token) throw Error("You need to login again");

    token = token.split(" ")[1];
    let payload = await jwt.decode(token, process.env.SECRET_KEY);

    // if (!payload.data.verify)
    //   throw Error("You have not been verified yet by support team");
    // if (payload.data.status !== "Active")
    //   throw Error("You status is not active, contact support team");

    req.userType = payload.data.userType;
    req.userId = payload.data.userId;
    next();
  } catch (e) {
    res.status(500).send({ status: "failed", message: e.message });
  }
};
