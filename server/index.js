/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();

//Import environment variables from .env file
require("dotenv").config();

//Import routes
const routes = require("./routes");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://asset-insights-technical-test.vercel.app/",
    ], // Allow requests from this origin
    methods: ["GET", "POST", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type"], // Allow these headers
  })
);

//Connect to MongoDB
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const db = mongoose.connection;

//Run database connection
db.on("error", (error) => console.error(error));

//Run once when the connection is opened
db.once("connected", () => {
  console.log("Database Connected");
});

//Set up CORS
const cors = require("cors");
app.use(cors());

//Use routes from separate file with prefix /api
app.use("/api", routes);

//Port to listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
