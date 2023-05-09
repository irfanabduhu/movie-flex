const router = require("express").Router();
const catalogueController = require("../controllers/catalogue");
const { authentication, adminOnly } = require("../utils/auth");

router.get("/basic", catalogueController.getBasic);
router.get("/premium", catalogueController.getAll);
router.get("/", catalogueController.getAll);
router.post("/", authentication, adminOnly, catalogueController.add);

module.exports = router;
