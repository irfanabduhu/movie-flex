const router = require("express").Router();
const castController = require("../controllers/cast");

router.get("/", castController.getAll);
router.get("/:name", castController.getByName);
router.post("/", castController.create);
router.put("/:id", castController.update);
router.delete("/:id", castController.delete);

module.exports = router;
