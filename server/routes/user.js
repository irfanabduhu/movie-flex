const router = require("express").Router();
const userController = require("../controllers/user");
const { authentication, adminOnly, currentUserOnly } = require("../utils/auth");

router.post("/", userController.create);

router.use(authentication);
router.get("/", adminOnly, userController.getAll);

router.use("/:id", currentUserOnly);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
