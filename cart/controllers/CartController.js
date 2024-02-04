const CartItemModel = require("../../common/models/CartItem");
const CartModel = require("../../common/models/Cart");
const ProductModel = require("../../common/models/Product");

module.exports = {
  addProductToCart: async (req, res) => {
    const { query: filters } = req;
    const { userId, productId, quantity } = req.body;

    let cart = (await CartModel.findCart(filters))[0];

    if (!cart) {
      const newCart = {
        userId: userId,
        createdAt: Date.now()
      };

      try {
        cart = await CartModel.createCart(newCart);
      } catch (err) {
        return res.status(500).json({
          status: false,
          error: err,
        });
      }
    }

    const product = await ProductModel.findProduct({ id: productId });

    const cartItem = {
      cartId: cart.id,
      productId: product.id,
      quantity: quantity
    };

    CartItemModel.addItemToCart(cartItem);

    return res.status(200).json({
      status: true,
      data: cart,
    });
  },

  getCartById: async (req, res) => {
    const { params: { cartId } } = req;

    const cartItems = await CartItemModel.findAllCartItems({ cartId });

    if (!cartItems || !cartItems.length) {
      return res.status(204).json({
        status: false,
        error: "cart not found"
      });
    }

    const products = await Promise.all(cartItems.map(async (item) => {
      const product = await ProductModel.findProduct(item.productId);
      return {
        product,
        quantity: item.quantity,
        value: product.price * item.quantity
      };
    }));

    return res.status(200).json({
      status: true,
      data: {
        cart: products
      }
    });
  },

  removeCartItem: (req, res) => {
    const { params: { cartItemId } } = req;

    CartItemModel.deleteCartItem({ id: cartItemId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfProductsDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
};