const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const peopleController = require("../controllers/peoples.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

// router.get("/all", awaitHandlerFactory(companyController.getCompanies));

// router.post("/", awaitHandlerFactory(companyController.createCompany));

// router.post("/gpt", awaitHandlerFactory(companyController.getGPT));

router.get("/matched", awaitHandlerFactory(peopleController.getMatched));

module.exports = router;
