const express = require("express");
const { CityController } = require("../../controllers")
const { CityMiddlewares } = require("../../middlewares")

const router = express.Router();

router.post("/", CityMiddlewares.validateCreateRequest, CityController.createCity);

router.get("/:id", CityController.getCity);
router.get("/", CityController.getAllCity);
router.delete("/:id", CityController.deleteCityById);
router.patch("/:id", CityController.updateCity);

module.exports = router;