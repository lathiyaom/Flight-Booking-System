const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require('../utils/error/app-error');

// Define the expected schema with types
const requiredFields = {
    flightNumber: 'string',
    airplaneId: 'number',
    departureAirportId: 'string',
    arrivalAirportId: 'string',
    arrivalTime: 'date',
    departureTime: 'date',
    price: 'number',
    boardingGate: 'string',
    totalSeats: 'number',
};

// Helper to check data types
function isValidType(value, type) {
    
    if (type === 'date') {
        return !isNaN(new Date(value).getTime());
    }
    return typeof value === type;
}

function validateCreateRequest(req, res, next) {
    const errors = [];

    for (const [field, type] of Object.entries(requiredFields)) {
        const value = req.body[field];

        if (value === undefined || value === null || value === '') {
            errors.push(`${field} is required.`);
        } else if (!isValidType(value, type)) {
            errors.push(`${field} should be of type ${type}.`);
        }
    }

    if (errors.length > 0) {
        ErrorResponse.message = "Invalid input for flight creation";
        ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest,
};
