import express from "express";
import devflikrCtrlDevFlikrApps from "../../controller/devflikr/devflikr-apps";

const routerDevFlikr = express.Router();

routerDevFlikr.get(
    "/devflikr-apps.json",
    devflikrCtrlDevFlikrApps,
);

export default routerDevFlikr;