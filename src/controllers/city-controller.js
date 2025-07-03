const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { message, data } = require("../utils/common/error-response");

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({ name: req.body.name });

    return res.status(StatusCodes.CREATED).json({
      ...SuccessResponse,
      data: city,
    });
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      ...ErrorResponse,
      message: error.explanation || "Something went wrong",
      error: error.message || error,
    });
  }
}


async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      ...SuccessResponse,
      data: city
    })
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.NOT_FOUND).json({
      ...ErrorResponse,
      message: error.explanation || "Something went wrong",
      error: error.message || error
    })
  }
}

async function getAllCity(req, res) {
  try {
    const citys = await CityService.getAllCity();
    return res.status(StatusCodes.OK).json({
      ...SuccessResponse,
      data: citys
    })

  } catch (error) {
    return res.status(error.statusCode || StatusCodes.NOT_FOUND).json({
      ...ErrorResponse,
      message: error.explanation || "Something went wrong",
      error: error.message || error
    })
  }
}

async function deleteCityById(req, res) {
  try {
    const city = await CityService.deleteCity(req.params.id);
    return res.status(StatusCodes.OK).json({
      ...SuccessResponse,
      data: city
    })
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.NOT_FOUND).json(ErrorResponse);
  }

}

async function updateCity(req, res) {

  try {
    const city = await CityService.updateCity(req.params.id, req.body);
    SuccessResponse.data = city;
    return res.status(StatusCodes.ACCEPTED).json(SuccessResponse)
  } catch (error) {
    ErrorResponse.message = error.message;
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.NOT_FOUND).json(ErrorResponse);
  }

}

module.exports = {
  createCity,
  getCity,
  getAllCity,
  deleteCityById,
  updateCity
};
