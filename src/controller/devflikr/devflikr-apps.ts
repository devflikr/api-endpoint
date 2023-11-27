import { ExpressRequest, ExpressResponse } from "../../types/Express";


async function devflikrCtrlDevFlikrApps(req: ExpressRequest, res: ExpressResponse) {
    res.json([
        {
            icon: "https://myaccount.devflikr.com/favicon.svg",
            name: "Manage Account",
            link: "https://myaccount.devflikr.com",
        },
        {
            icon: "https://devnote.devflikr.com/favicon.svg",
            name: "DevNote",
            link: "https://devnote.devflikr.com",
        },
    ]);
}

export default devflikrCtrlDevFlikrApps;