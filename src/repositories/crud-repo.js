const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/error/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async createRecoreds(data) {
    try {
      console.log(data)
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CrudRepo : create");
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if (!response) {
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND)
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CrudRepo : destroy");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if (!response) {
        throw new AppError("  Resource not found ", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CrudRepo : get");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CrudRepo : getAll");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });

      return this.get(id);
    } catch (error) {
      Logger.error("Something went wrong in the CrudRepo : update");
      throw error;
    }
  }
}

module.exports = CrudRepository;
