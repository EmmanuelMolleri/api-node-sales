const { DataTypes } = require("sequelize");

const CartItemModel = {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
};

module.exports = {
    initialise: (sequelize) => {
      this.model = sequelize.define("cartItem", CartItemModel)
    },
  
    addItemToCart: (cartItem) => {
      return this.model.create(cartItem);
    },
  
    findCartItem: (query) => {
      return this.model.findOne({
        where: query,
      });
    },
  
    updateCartItem: (query, updatedValue) => {
      return this.model.update(updatedValue, {
        where: query,
      });
    },
  
    findAllCartItems: (query) => {
      return this.model.findAll({
        where: query
      });
    },
  
    deleteCartItem: (query) => {
      return this.model.destroy({
        where: query
      });
    }
}