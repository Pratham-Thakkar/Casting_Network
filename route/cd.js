const router = require("express").Router();
const projectController = require("../controller/project");
const { isAuth } = require("../middleware/isAuth");
const { cdAuth } = require("../middleware/cdAuth");

router.post("/addProject", isAuth, cdAuth, projectController.addProject);
router.get("/listProject", isAuth, cdAuth, projectController.listProject);
router.put(
  "/updateProject/:projectId",
  isAuth,
  cdAuth,
  projectController.updateProject
);
router.delete(
  "/deleteProject/:projectId",
  isAuth,
  cdAuth,
  projectController.deleteProject
);

router.post(
  "/duplicateProject/:projectId",
  isAuth,
  cdAuth,
  projectController.duplicateProject
);
module.exports = router;
