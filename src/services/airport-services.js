const { StatusCodes } = require("http-status-codes");

const { AirportRepository } = require("../repositories");

const AppError = require('../utils/error/app-error');

const { UniqueConstraintError, ValidationError } = require('sequelize');


const airportRepository = new AirportRepository();

async function create(data) {
    try {
        const airPort = await airportRepository.createRecoreds(data);
        return airPort;
    } catch (error) {

        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            const explanations = error.errors.map(err => err.message);
            throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
        }

        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirPort() {
    try {
        const airPorts = airportRepository.getAll();
        return airPorts;
    } catch (error) {
        throw new AppError(
            "cannot fetch the data of all airPorts from DB",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAirPort(id) {
    try {
        const airPort = airportRepository.get(id);
        return airPort;
    } catch (error) {
        if (error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError("AirPort does not existed into the databases", error.statuscode);
        }
        throw new AppError(
            "Cannot fetch the data from airPort DB",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function deleteAirport(id) {
    try {
        const airPort = airportRepository.destroy(id);
        return airPort;
    } catch (error) {
        if (error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError("AirPort does not existed into the databases", error.statuscode);
        }
        throw new AppError(
            "Cannot fetch the data from AirPort DB",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}


async function updateAirport(id, data) {
    try {
        const airplane = airportRepository.update(id, data);
        return airplane;
    } catch (error) {
        if (error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError("AirPort does not existed into the databases", error.statuscode);
        }
        throw new AppError(
            "Cannot fetch the data from airplanes DB",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

module.exports = {
    create,
    getAllAirPort,
    getAirPort,
    deleteAirport,
    updateAirport
};
