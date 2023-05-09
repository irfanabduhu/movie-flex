const router = require("express").Router();
const castController = require("../controllers/cast");
const { authentication, adminOnly } = require("../utils/auth");

router.get("/", castController.getAll);
router.get("/:name", castController.getByName);

router.use(authentication, adminOnly);
router.post("/", castController.create);
router.put("/:id", castController.update);
router.delete("/:id", castController.delete);

module.exports = router;
