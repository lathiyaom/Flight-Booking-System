const { Sequelize } = require("sequelize")
const CrudRepository = require("./crud-repo");
const { Flight, Airplane, Airport } = require("../models")

const db = require("../models")
const { addRowLockonFlights } = require("./queries")

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane
                },
                {
                    model: Airport,
                    required: true,
                    as: "departure_airport",
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("departure_airport.code"))
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrival_airport",
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arr"), "=", Sequelize.col("arrival_airport.code"))
                    }
                }
            ]
        })
        return response;
    }

    async updateRemainingSeats(flightId, seats, decrease = true) {

        await db.sequelize.query(addRowLockonFlights(flightId));

        const flight = await Flight.findByPk(flightId);
        if (+decrease) {
            await flight.decrement('totalSeats', {
                by: seats,
                where: { id: flightId }
            });
        } else {
            await flight.increment('totalSeats', {
                by: seats,
                where: { id: flightId }
            });
        }
        return flight.save();
    }

}

module.exports = FlightRepository;
