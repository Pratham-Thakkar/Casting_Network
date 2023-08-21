const router = require("express").Router();

const locationController = require("../controller/location");
const adminController = require("../controller/admin");
const ethnicityController = require("../controller/ethinicity");
const genderController = require("../controller/gender");
const projectTypeController = require("../controller/projectType");
const roleTypeController = require("../controller/roleType");
const skillRouter = require("../controller/skill");
const unionController = require("../controller/union");
const { isAuth } = require("../middleware/isAuth");
const { adminAuth } = require("../middleware/adminAuth");

router.post("/addLocation", isAuth, adminAuth, locationController.addLocation);
router.get("/getLocation", isAuth, adminAuth, locationController.getLocation);

router.post(
  "/addEthnicity",
  isAuth,
  adminAuth,
  ethnicityController.addEthnicity
);
router.get(
  "/getEthnicity",
  isAuth,
  adminAuth,
  ethnicityController.getEthnicity
);

router.post("/addGender", isAuth, adminAuth, genderController.addGender);
router.get("/getGender", isAuth, adminAuth, genderController.getGender);

router.post(
  "/addProjectType",
  isAuth,
  adminAuth,
  projectTypeController.addProjectType
);
router.get(
  "/getProjectType",
  isAuth,
  adminAuth,
  projectTypeController.getProjectType
);

router.post("/addRoleType", isAuth, adminAuth, roleTypeController.addRoleType);
router.get("/getRoleType", isAuth, adminAuth, roleTypeController.getRoleType);

router.post("/addSkills", isAuth, adminAuth, skillRouter.addSkills);
router.get("/getSkills", isAuth, adminAuth, skillRouter.getSkills);

router.post("/addUnion", isAuth, adminAuth, unionController.addUnion);
router.get("/getUnion", isAuth, adminAuth, unionController.getUnion);

router.post("/verifyCd/:userId", isAuth, adminAuth, adminController.verifyCd);

module.exports = router;
