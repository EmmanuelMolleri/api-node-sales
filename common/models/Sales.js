const { DataTypes } = require("sequelize");

const SaleModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("sale", SaleModel);
  },

  createProduct: (sale) => {
    return this.model.create(sale);
  },

  findProduct: (query) => {
    return this.model.findOne({
      where: query,
    });
  },

  updateProduct: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  findAllProducts: (query) => {
    return this.model.findAll({
      where: query,
    });
  },

  deleteProduct: (query) => {
    return this.model.destroy({
      where: query,
    });
  },
};
