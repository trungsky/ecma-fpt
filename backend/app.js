import express from "express";
import dotenv from "dotenv";
import RouterProduct from "./routes/product";
import RouterCategory from "./routes/category";
import HomePage from "./routes/HomePage";
import mongoose from "mongoose";
import auth from "./routes/auth";
import expressValidator from "express-validator";
import cors from "cors";
import RouterUser from "./routes/user";
import RouterBanner from "./routes/banner";
import RouterBilling from "./routes/billing";
import RouterContact from "./routes/contact";
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cors({ credentials: "same-origin" }));

app.use(cookieParser());
app.use(expressValidator());

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Only login, banner, category

const port = process.env.PORT || 8080;

// Routes
app.use("/api", RouterProduct);
app.use("/api", RouterCategory);
app.use("/api", auth);
app.use("/api", RouterUser);
app.use("/api", RouterBanner);
app.use("/api", RouterBilling);
app.use("/api", RouterContact);
app.get("/", HomePage);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    createIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// App listen
app.listen(port, () => {
  console.log("Server running at: http://localhost:" + port);
});
