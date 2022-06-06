import app from "./server.js";
import dotenv from "dotenv";
import mongodb from "mongodb";
import ListingsDAO from "./dao/listingsDAO.js";
import ReservationsDAO from "./dao/reservationsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 5000;

MongoClient.connect(
  process.env.MONGO_ATLAS_URI,
  {
    maxPoolSize: 50,
    wtimeout: 2500
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    await ListingsDAO.injectDB(client);
    await ReservationsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
