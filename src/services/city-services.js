const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/error/app-error");
const { UniqueConstraintError, ValidationError } = require("sequelize");


const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.createRecoreds(data);
        return city;
    } catch (error) {
        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            const explanations = error.errors.map(err => err.message);

            throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
        }

        throw new AppError("Cannot create a new City object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        throw new AppError("Cannot find the City object", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCity() {
    try {
        const citys = await cityRepository.getAll();
        return citys;
    } catch (error) {
        throw new AppError("Cannot find the city object", StatusCodes.NOT_FOUND)
    }
}


async function deleteCity(id) {
    try {
        const city = await cityRepository.destroy(id);
        return city;
    } catch (error) {
        throw new AppError("Cannot found the city object", StatusCodes.NOT_FOUND)
    }

}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        throw new AppError("cannot found the city object", StatusCodes.NOT_FOUND)
    }
}
module.exports = {
    createCity,
    getCity,
    getAllCity,
    deleteCity,
    updateCity
};
