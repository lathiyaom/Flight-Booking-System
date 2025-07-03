const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");

const { AppError } = require("../utils/error/app-error");

const airplaneRepository = new AirplaneRepository();

async function create(data) {
  try {
    const airplane = await airplaneRepository.createRecoreds(data);
    return airplane;
  } catch (error) {
    if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
      const explanations = error.errors.map(err => err.message);
      throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
    }

    throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getAllAirplanes() {
  try {
    const airplanes = airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "cannot fetch the data of all airplanes from DB",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statuscode == StatusCodes.NOT_FOUND) {
      throw new AppError("AirPlane does not existed into the databases", error.statuscode);
    }
    throw new AppError(
      "Cannot fetch the data from airplanes DB",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function deleteAirplane(id) {
  try {
    const airplane = airplaneRepository.destroy(id);
    return airplane;
  } catch (error) {
    if (error.statuscode == StatusCodes.NOT_FOUND) {
      throw new AppError("AirPlane does not existed into the databases", error.statuscode);
    }
    throw new AppError(
      "Cannot fetch the data from airplanes DB",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


async function updateAirplane(id, data) {
  try {
    const airplane = airplaneRepository.update(id, data);
    return airplane;
  } catch (error) {
    if (error.statuscode == StatusCodes.NOT_FOUND) {
      throw new AppError("AirPlane does not existed into the databases", error.statuscode);
    }
    throw new AppError(
      "Cannot fetch the data from airplanes DB",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  create,
  getAllAirplanes,
  getAirplane,
  deleteAirplane,
  updateAirplane
};
