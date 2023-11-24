// Setup dotenv
import "dotenv/config";

// MongoDB imports
import mongo from "./mongodb";
import mongoose, { ConnectOptions } from "mongoose";

// Express App imports
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userAgent from "express-useragent";
import express, { Express } from "express";

import routerDevNote from "./routes/devnote";

// Setup a common mongodb database
mongoose
    .connect(mongo.connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => console.log("MongoDB is connected successfully."))
    .catch((err) => console.error(err));

// Create an express app
const expressApp: Express = express();

// Use default settings
expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(userAgent.express());
expressApp.use(morgan("dev"));
expressApp.use(cors({
    origin: [
        /^https:\/\/(?:[a-zA-Z0-9-]+\.)?devflikr\.com$/,
        /^http:\/\/localhost:(5\d{3}|5999)$/,
    ],
    credentials: true,
}));

// Setup port and test routes
expressApp.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`);
});

expressApp.get("/test", (req, res) => {
    res.json(req.query || {});
});

expressApp.get("/", (req, res) => {
    res.send("<center><h2>If you are seeing this, it means the server is working well.<hr />Just close this tab and go back to sleep. Good night...</h2></center>");
});


// Add more routes here
expressApp.use("/devnote", routerDevNote);