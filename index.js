import { createServer } from "http";
import { Server } from "socket.io";

const httpsServer = createServer();

const io = new Server(httpsServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500", "http://127.0.0.1:8080", "http://127.0.0.1:4201"]
    }
});

io.on("connection", socket => {

    console.log(`User ${socket.id} connected`)

    socket.on("message", data => {

        console.log(data);

        io.emit("message", `${socket.id.substring(5)}: ${data}`);
    });
});

httpsServer.listen(3500, () => {
    console.log("Listening on port 3500");
});