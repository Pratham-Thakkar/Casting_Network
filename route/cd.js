const router = require("express").Router();
const projectController = require("../controller/project");
const { isAuth } = require("../middleware/isAuth");
const { cdAuth } = require("../middleware/cdAuth");

router.post("/addProject", isAuth, cdAuth, projectController.addProject);
router.get("/listProject", isAuth, cdAuth, projectController.listProject);

module.exports = router;
