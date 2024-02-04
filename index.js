const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

const AuthorizationRoutes = require("./authorization/routes");
const ProductRoutes = require("./products/routes");
const CartController = require("./cart/routes");

const UserModel = require("./common/models/User");
const ProductModel = require("./common/models/Product");
const SalesModel = require("./common/models/Sales");
const CartModel = require("./common/models/Cart");
const CartItemModel = require("./common/models/CartItem");

app.use(morgan("tiny"));
app.use(cors());

app.use(Express.json());

const sequelize = new Sequelize({
   dialect: "sqlite",
   storage: "./storage/data.db", 
 });
 
 UserModel.initialise(sequelize);
 ProductModel.initialise(sequelize);
 SalesModel.initialise(sequelize);
 CartModel.initialise(sequelize);
 CartItemModel.initialise(sequelize);

 sequelize
   .sync()
   .then(() => {
     console.log("Sequelize Initialised!!");
 
     app.use("/", AuthorizationRoutes);
     app.use("/products", ProductRoutes);
     app.use("/cart", CartController);
 
     app.listen(PORT, () => {
       console.log("Server Listening on PORT:", port);
     });
   })
   .catch((err) => {
     console.error("Sequelize Initialisation threw an error:", err);
   });