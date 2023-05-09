const router = require("express").Router();
const movieController = require("../controllers/movie");
const { authentication, adminOnly } = require("../utils/auth");

router.get("/", movieController.getAll);
router.get("/:title", movieController.getByTitle);

router.use(authentication, adminOnly);
router.post("/", movieController.create);
router.put("/:id", movieController.update);
router.delete("/:id", movieController.delete);

module.exports = router;
