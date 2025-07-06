const { StatusCodes } = require("http-status-codes");
const { AirPortService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req, res) {
    try {
        const airport = await AirPortService.create({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });

        SuccessResponse.data = airport;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


async function getAllAirports(req, res) {
    try {

        const airports = await AirPortService.getAllAirPort();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statuscode).json(ErrorResponse);
    }
}

async function getAirport(req, res) {
    try {
        const airport = await AirPortService.getAirPort(req.params.id); // ✅ fixed here
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
    }
}


async function deleteAirport(req, res) {
    try {
        const airport = await AirPortService.deleteAirport(req.params.id); // ✅ fixed here
        SuccessResponse.data = "Delet the recoreds successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
    }
}




async function updateAirport(req, res) {
    try {
        const airport = await AirPortService.updateAirport(req.params.id, req.body); // ✅ fixed here
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statuscode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse); // ✅ added fallback
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    deleteAirport,
    updateAirport
};
