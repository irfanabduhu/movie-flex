const router = require("express").Router();
const rentController = require("../controllers/rent");
const { authentication, adminOnly, currentUserOnly } = require("../utils/auth");

router.use(authentication);
router.get("/", adminOnly, rentController.getAll);
router.get("/status", rentController.getRentStatus);
router.get("/user/:id", currentUserOnly, rentController.getByUserId);
router.get("/movie/:id", adminOnly, rentController.getByMovieId);
router.post("/", rentController.create);
router.put("/", rentController.update);
router.delete("/", rentController.delete);

module.exports = router;
