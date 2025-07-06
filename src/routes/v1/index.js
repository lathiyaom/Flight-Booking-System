const express = require("express");

const airplaneRoutes = require("./airplane-routes");

const cityRouter = require("./city-routes")

const airPortRouter = require("./airport-routes")

const flightRouter = require("./flight-routes");

const router = express.Router();

router.use("/airplane", airplaneRoutes);

router.use("/city", cityRouter)

router.use("/airport", airPortRouter)

router.use("/flight", flightRouter)

module.exports = router;
