const router = require("express").Router();

const adminController = require("../controller/admin");
const { isAuth } = require("../middleware/isAuth");
const { adminAuth } = require("../middleware/adminAuth");

router.post("/addLocation", isAuth, adminAuth, adminController.addLocation);
router.get("/getLocation", isAuth, adminAuth, adminController.getLocation);
router.post("/verifyCd/:userId", isAuth, adminAuth, adminController.verifyCd);

module.exports = router;
