const router = require("express").Router();

const locationController = require("../controller/location");
const adminController = require("../controller/admin");
const { isAuth } = require("../middleware/isAuth");
const { adminAuth } = require("../middleware/adminAuth");

router.post("/addLocation", isAuth, adminAuth, locationController.addLocation);
router.get("/getLocation", isAuth, adminAuth, locationController.getLocation);
router.post("/verifyCd/:userId", isAuth, adminAuth, adminController.verifyCd);

module.exports = router;
