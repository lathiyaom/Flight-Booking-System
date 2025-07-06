const { StatusCodes } = require("http-status-codes");

const { FlightRepository } = require("../repositories");

const AppError = require('../utils/error/app-error');

const { UniqueConstraintError, ValidationError, Op } = require('sequelize');
const { ErrorResponse } = require("../utils/common");


const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        if (new Date(data.departureTime) >= new Date(data.arrivalTime)) {
            ErrorResponse.message = "Arrival time must be after departure time";
            ErrorResponse.data = null;
            throw new AppError(ErrorResponse.message, StatusCodes.BAD_REQUEST);
        }


        const flight = await flightRepository.createRecoreds(data);
        return flight;
    } catch (error) {

        if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            const explanations = error.errors.map(err => err.message);
            throw new AppError(explanations.join(", "), StatusCodes.BAD_REQUEST);
        }

        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllFlights(query) {

    let customFilter = {};
    const endingTripTime = " 23:59:00"
    let sortFilter = [];
    // trips=MUM-DEL
    if (query.trips) {

        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice == undefined) ? 20000 : maxPrice]
        }
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }

    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((params) => params.split("_"));
        sortFilter = sortFilters

    }
    //TODO 

    try {
        console.log(customFilter)
        const flight = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flight;

    } catch (error) {
        throw new AppError("Cannot fetch data of all the flights", StatusCodes.INTERNAL_SERVER_ERROR)
    }

}


module.exports = {
    createFlight,
    getAllFlights,
}   