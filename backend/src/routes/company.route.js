const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company.controller");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get("/all", awaitHandlerFactory(companyController.getCompanies));

router.post("/", awaitHandlerFactory(companyController.createCompany));

router.post("/gpt", awaitHandlerFactory(companyController.getGPT));

module.exports = router;
