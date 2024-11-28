import Hapi from "@hapi/hapi";
import { configDotenv } from "dotenv";
import sequelize from "./config/sequelizeInstance.js";

configDotenv({
  path: ".env",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    await sequelize.sync({force: false})
    console.log('Database synchronized successfully.')

    const init = async () => {
      const server = Hapi.Server({
        port: process.env.PORT || 3000,
        host: "localhost",
      });

      server.route({
        method: "GET",
        path: "/",
        handler: (req, h) => {
          return "Hello World\n";
        },
      });

      await server.start();
      console.log(`Server running at port: ${process.env.PORT}`);
    };

    await init();
  } catch (error) {
    console.log(`database connection failed: ${error}`)
  }
})()
