const url = `ws://${window.location.hostname}:${window.location.port}/ws`;
const socket = new WebSocket(url);

// Listen for WebSocket open event
socket.addEventListener("open", (event) => {
  console.log("WebSocket connected.");
});

let prices = [];

const renderPrices = () => {
  const pricesDiv = document.getElementById("prices");
  if (prices.length === 0) {
    return;
  }
  pricesDiv.innerHTML = ""; // Clear existing content
  prices.forEach((price) => {
    const div = document.createElement("div");
    div.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded",
      "size-32",
      "bg-slate-500",
      "m-2",
      "p-4"
    );
    const h2 = document.createElement("h2");
    h2.classList.add("text-2xl", "font-semibold");
    h2.innerText = price.company;
    const span = document.createElement("span");
    span.classList.add("text-xl");
    span.innerText = price.price.toFixed(2); // Ensure the price is formatted correctly
    div.appendChild(h2);
    div.appendChild(span);
    pricesDiv.appendChild(div);
  });
};

// Listen for messages from server
socket.addEventListener("message", (event) => {
  // console.log("Received message: ", event.data);
  const message = JSON.parse(event.data);
  switch (message.type) {
    case "prices":
      prices = message.prices;
      renderPrices();
      break;
    default:
      console.error("Unknown message type:", message.type);
  }
});

// Listen for WebSocket close event
socket.addEventListener("close", (event) => {
  console.log("WebSocket closed.");
});

// Listen for WebSocket errors
socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
