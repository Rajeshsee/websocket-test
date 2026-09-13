const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({
    server: server
});

app.get("/", (req, res) => {
    res.send("WebSocket server is running!");
});

wss.on("connection", (ws) => {

    console.log("Client connected");

    ws.send("Hello from Render!");

    ws.on("message", (message) => {

        console.log("Received:", message.toString());

        ws.send(
            "Server received: " + message.toString()
        );
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("error", (error) => {
        console.log("WebSocket error:", error);
    });
});

const PORT = process.env.PORT || 10000;

server.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
