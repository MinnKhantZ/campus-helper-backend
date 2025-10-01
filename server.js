import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from 'path';
import corsOptions from "./src/config/corsOptions.js";
import sequelize, { PORT, NODE_ENV } from "./src/config/db.config.js";
import "./src/models/User.js";
import "./src/models/Event.js";
import "./src/models/Timetable.js";
import "./src/models/Club.js";
import "./src/models/Announcement.js";
import "./src/models/MarketplaceItem.js";
import "./src/models/Message.js";
import authRoutes from "./src/routes/Auth.js";
import eventRoutes from "./src/routes/Event.js";
import timetableRoutes from "./src/routes/Timetable.js";
import userRoutes from "./src/routes/User.js";
import clubRoutes from "./src/routes/Club.js";
import uploadRoutes from "./src/routes/Upload.js";
import marketplaceRoutes from "./src/routes/Marketplace.js";

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
// static uploads
app.use('/uploads', express.static(path.resolve('uploads')));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use("/api/timetables", timetableRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/marketplace", marketplaceRoutes);

// Sync models with the database

sequelize
  .authenticate()
  .then(async () => {
    try {
      if (NODE_ENV !== 'production') {
        await sequelize.sync({ alter: true }).then(() => {
          console.log("✅ Database synced (development)");
        });
      }
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
