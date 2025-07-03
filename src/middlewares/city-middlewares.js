const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req, res, next) {

    if (!req.body.name) {
        ErrorResponse.message = "Something went wrong while creating  city";
        ErrorResponse.error = new AppError(
            ["name is not found in the incoming request..."],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
};
