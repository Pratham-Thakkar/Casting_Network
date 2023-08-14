const router = require("express").Router();

const userController = require("../controller/user");

router.post("/updatePassword", userController.updatePassword);

module.exports = router;
