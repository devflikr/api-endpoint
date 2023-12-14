import { Server, IncomingMessage, ServerResponse } from "http";
import { Server as SocketServer } from "socket.io";

type StreamJoin = {
    user: string;
    name: string;
    code: string;
    stream: null;
    profile: string;
};

type StreamUser = {
    user: string;
    name: string;
    profile: string;
    stream: null;
    isAdmin: boolean;
}

type StreamRoom = {
    code: string;
    user: string;
    users: { [key: string]: StreamUser };
}

const STREAM_ROOMS: { [key: string]: StreamRoom } = {};

const CHARACTER_SET = "abcdefghijklmnopqrstuvwxyz";

export function generateMeetUpCode() {
    function generator() {
        let result = "";
        for (let i = 0; i < 9; i++) {

            result += CHARACTER_SET.charAt(Math.floor(Math.random() * CHARACTER_SET.length));

            if (i !== 8 && i % 3 === 2) result += "-";
        }
        return result;
    }

    function generateAndCheck() {
        const code = generator();
        if (STREAM_ROOMS[code]) return generateAndCheck();
        return code;
    }
    return generateAndCheck();
}

function meetupCtrlSocket(server: Server<typeof IncomingMessage, typeof ServerResponse>) {
    const io = new SocketServer(server, {
        path: "/meetup/stream",
        cors: {
            origin: "http://localhost:5205",
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });

        socket.on("stream-create", (user: string) => {
            const code = generateMeetUpCode();
            STREAM_ROOMS[code] = {
                user: user,
                code: code,
                users: {},
            };
            socket.emit("stream-create", code);
        });

        socket.on("stream-status", (code: string) => {
            console.log(code);
            if (!STREAM_ROOMS[code]) return socket.emit("stream-status", "This room doesn't exist", []);
            if (Object.keys(STREAM_ROOMS[code].users).length >= 4) return socket.emit("stream-status", "This room is already full", []);
            socket.emit("stream-status", "", Object.values(STREAM_ROOMS[code].users).map(user => ({ name: user.name, profile: user.profile })));
        });

        socket.on("stream-join", (data: StreamJoin) => {
            if (!STREAM_ROOMS[data.code]) return socket.emit("stream-join", {
                error: "This room doesn't exist",
            });
            if (Object.keys(STREAM_ROOMS[data.code].users).length >= 4) return socket.emit("stream-join", {
                error: "This room is already full",
            });
            STREAM_ROOMS[data.code].users[data.user] = {
                user: data.user,
                name: data.name,
                stream: data.stream,
                profile: data.profile,
                isAdmin: data.user === STREAM_ROOMS[data.code].user,
            };
            socket.join(data.code);
        });

        socket.on("stream-content", (data: StreamJoin) => {

        });
    });
}

export default meetupCtrlSocket;