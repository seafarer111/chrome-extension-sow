const express = require("express");
const router = express.Router();
const peopleController = require("../controllers/peoples.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/matched", awaitHandlerFactory(peopleController.getMatched));
router.post(
  "/salesnavigator",
  awaitHandlerFactory(peopleController.saveSalesNavigator)
);

module.exports = router;
