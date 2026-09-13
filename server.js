const WebSocket = require("ws");

const port = process.env.PORT || 10000;

const wss = new WebSocket.Server({ port });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send("Hello from Render WebSocket!");

    ws.on("message", (message) => {
        console.log("Received:", message.toString());

        ws.send("Server received: " + message.toString());
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server running on port " + port);
