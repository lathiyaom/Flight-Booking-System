const express = require("express");

const airplaneRoutes = require("./airplane-routes");
const cityRouter = require("./city-routes")

const router = express.Router();

router.use("/airplane", airplaneRoutes);

router.use("/city", cityRouter)

module.exports = router;
