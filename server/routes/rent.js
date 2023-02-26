const router = require("express").Router();
const rentController = require("../controllers/rent");

router.get("/", rentController.getAll);
router.get("/status", rentController.getRentStatus);
router.get("/user/:id", rentController.getByUserId);
router.get("/movie/:id", rentController.getByMovieId);
router.post("/", rentController.create);
router.put("/", rentController.update);
router.delete("/", rentController.delete);

module.exports = router;
