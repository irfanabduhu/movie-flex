const router = require("express").Router();
const fetchController = require("../controllers/fetch");
const { authentication } = require("../utils/auth");

router.get("/", authentication, fetchController.get);

module.exports = router;
