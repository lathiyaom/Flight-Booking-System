const CrudRepository = require("./crud-repo");
const { Airplane } = require("../models")

class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
}

module.exports = AirplaneRepository;
