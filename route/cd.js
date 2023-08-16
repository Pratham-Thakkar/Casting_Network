const router = require("express").Router();
const projectController = require("../controller/project");

router.post("/addProject", projectController.addProject);
router.get("/listProject", projectController.listProject);
module.exports = router;
