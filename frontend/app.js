const express = require("express");
const http = require("http");
const { initializeWebsocketServer } = require("./server/websocketserver");
const { initializeMongoDB } = require("./server/database");

// Create the express server
const app = express();
const server = http.createServer(app);

const env = process.env.NODE_ENV || "development";

// Deliver static files from the client folder like css, js, images
app.use(express.static("client"));

// Health check route
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Allowing top-level await
(async function () {
  // Initialize the database
  await initializeMongoDB();
  // Initialize the websocket server
  initializeWebsocketServer(server);
  // Start the web server
  const serverPort = process.env.PORT || 3000;
  server.listen(serverPort, () => {
    console.log(
      `Express Server started on port ${serverPort} as '${env}' Environment`
    );
  });
})();
