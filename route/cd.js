const router = require("express").Router();
const projectController = require("../controller/project");

router.post("/addProject", projectController.addProject);
module.exports = router;
