const { DataTypes } = require("sequelize");

const CartModel = {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
};

module.exports = {
  initialise: (sequelize) => {
    this.model = sequelize.define("cart", CartModel)
  },

  createCart: (cart) => {
    return this.model.create(cart);
  },

  findCart: (query) => {
    return this.model
    .findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      where: query,
      limit: 1
    });
  },

  updateCart: (query, updatedValue) => {
    return this.model.update(updatedValue, {
      where: query,
    });
  },

  deleteCart: (query) => {
    return this.model.destroy({
      where: query
    });
  }
}