const router = require("express").Router();
const userController = require("../controller/user");

router.post("/signup", userController.addUser);
router.post("/login", userController.login);
router.post("/updatePassword", userController.updatePassword);

module.exports = router;
