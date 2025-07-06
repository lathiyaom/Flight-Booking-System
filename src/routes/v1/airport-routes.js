const express = require("express");

const { AirPortController } = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");
const router = express.Router();

router.post(
    "/",
    AirportMiddlewares.validateCreateRequest,
    AirPortController.createAirport
);

router.get("/", AirPortController.getAllAirports);

router.get("/:id", AirPortController.getAirport);

router.delete("/:id", AirPortController.deleteAirport);
router.patch("/:id", AirPortController.updateAirport);

module.exports = router;
