import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import corsOptions from "./src/config/corsOptions.js";
import sequelize, { PORT } from "./src/config/db.config.js";
import "./src/models/User.js";
import "./src/models/Event.js";
import "./src/models/Timetable.js";
import "./src/models/Club.js";
// import userRoutes from "./src/routes/User.js";
import eventRoutes from "./src/routes/Event.js";
import timetableRoutes from "./src/routes/Timetable.js";
import clubRoutes from "./src/routes/Club.js";

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

// app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/clubs", clubRoutes);

// Sync models with the database

sequelize
  .authenticate()
  .then(async () => {
    try {
      // await sequelize.sync({ force: false, alter: true }).then(() => {
      //   console.log("✅ Database synced");
      // });
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
