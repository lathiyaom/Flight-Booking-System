const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.create({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });

    SuccessResponse.data = airplane;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res.status(error.statuscode).json(ErrorResponse);
  }
}


async function getAllAirplanes(req, res) {
  try {

    const airplanes = await AirplaneService.getAllAirplanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode).json(ErrorResponse);
  }
}

async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id); // ✅ fixed here
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
  }
}


async function deleteAirplane(req, res) {
  try {
    const airplane = await AirplaneService.deleteAirplane(req.params.id); // ✅ fixed here
    SuccessResponse.data = "Delet the recoreds successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
  }
}




async function updateAirplane(req, res) {
  try {
    const airplane = await AirplaneService.updateAirplane(req.params.id, req.body); // ✅ fixed here
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
  }
}

module.exports = {
  createAirplane,
  getAllAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane
};
