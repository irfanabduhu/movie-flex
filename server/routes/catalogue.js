const router = require("express").Router();
const catalogueController = require("../controllers/catalogue");

router.get("/basic", catalogueController.getBasic);
router.get("/premium", catalogueController.getAll);
router.get("/", catalogueController.getAll);
router.post("/", catalogueController.add);

module.exports = router;
