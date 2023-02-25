const router = require("express").Router();
const fetchController = require("../controllers/fetch");

router.get("/", fetchController.get);

module.exports = router;
