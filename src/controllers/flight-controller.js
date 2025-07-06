const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");

const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req, res) {
    try {
        console.log("Incoming Request Body:", req.body);
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });


        SuccessResponse.data = flight;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {

    try {
        const flight = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flight;

        return res.status(StatusCodes.CREATED).json(SuccessResponse);

    } catch (error) {

        ErrorResponse.error = error;
        ErrorResponse.message = error.message;

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}