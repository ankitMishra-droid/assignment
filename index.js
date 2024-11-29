import Hapi from "@hapi/hapi";
import { configDotenv } from "dotenv";
import sequelize from "./config/sequelizeInstance.js";
import { getAllUser, login, logout, registerUser } from "./controller/user.js";
import { authenticate, restrictTo } from "./utils/jwtAuth.js";

configDotenv({
  path: ".env",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    await sequelize.sync({ force: false });

    const init = async () => {
      const server = Hapi.Server({
        port: process.env.PORT || 3000,
        host: "localhost",
      });

      server.route([
        {
          method: "GET",
          path: "/",
          handler: (req, h) => {
            return "Networth-Tracking\n";
          },
        },
        {
          method: "POST",
          path: "/api/users/register",
          handler: registerUser,
        },
        {
          method: "POST",
          path: "/api/users/login",
          handler: login,
        },
        {
          method: "GET",
          path: "/api/users/logout",
          options: {
            pre: [authenticate],
          },
          handler: logout,
        },
        {
          method: "GET",
          path: "/api/user/all-users",
          options: {
            pre: [authenticate, restrictTo(["ADMIN"])],
          },
          handler: getAllUser,
        },
      ]);

      await server.start();
      console.log(`Server running at port: ${process.env.PORT}`);
    };

    await init();
  } catch (error) {
    console.log(`database connection failed: ${error}`);
  }
})();
