import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./src/config/corsOptions.js";
import sequelize, { PORT } from "./src/config/db.config.js";
// import "./src/models/User.js";
// import "./src/models/Event.js";
// import "./src/models/Timetable.js";
// import "./src/models/Club.js";
// import clientRouter from "./src/routes/clientRouter.js";
// import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    limit: "60mb",
    extended: true,
    parameterLimit: 1000000,
  }),
);

// client
// app.use("/api/client/", clientRouter);

// app.use(errorHandler);

// Sync models with the database

sequelize
  .authenticate()
  .then(async () => {
    try {
      await sequelize.sync({ force: false, alter: true }).then(() => {
        console.log("✅ Database synced");
      });
      // Start the server
      app.listen(PORT, () => {
        console.log(`🎉 Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.log("❌ Error syncing database", error);
    }
  })
  .catch((error) => {
    console.log("❌ Error connecting to database", error);
  });
