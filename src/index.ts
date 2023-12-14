// Setup dotenv
import "dotenv/config";
import https from "https";


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
import routerDevFlikr from "./routes/devflikr";
import { resolve } from "path";
import routerMeetUp from "./routes/meetup";
import meetupCtrlSocket from "./controller/meetup";

// Setup a common mongodb database
mongoose
    .connect(mongo.connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => console.log("⚔️  api @database mongodb"))
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

expressApp.use(express.static(resolve("public")));

// Setup port and test routes
const expressServer = expressApp.listen(process.env.PORT, () => {
    console.log(`⚔️  api @port ${process.env.PORT}`);
});

expressApp.get("/health", (req, res) => {
    res.sendStatus(200);
});

if (process.env.IS_HEALTH_CHECK_ENABLED) {
    setInterval(() => {
        console.log("⚔️  api @health", new Date().toLocaleString());
        https.get("https://devflikrapi.onrender.com/health");
    }, 540000);
}


// Add more routes here
expressApp.use("/meetup", routerMeetUp);
expressApp.use("/devnote", routerDevNote);
expressApp.use("/devflikr", routerDevFlikr);

// MeetUp Special WebSocket server
meetupCtrlSocket(expressServer);