const createWebSocket = () => {
  const url = window.location.href.replace("http", "ws");
  const socket = new WebSocket(url);

  socket.addEventListener("open", () => {
    console.log("WebSocket connected.");
  });

  socket.addEventListener("message", (event) => {
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

  socket.addEventListener("close", (event) => {
    console.log("WebSocket closed. Reconnecting...");
    setTimeout(createWebSocket, 1000); // Attempt to reconnect after 1 second
  });

  socket.addEventListener("error", (event) => {
    console.error("WebSocket error:", event);
    socket.close();
  });

  return socket;
};

let socket = createWebSocket();

let prices = [];

const renderPrices = () => {
  const pricesDiv = document.getElementById("prices");
  if (prices.length === 0) {
    pricesDiv.innerHTML = `
      <div class="flex items-center justify-center w-64 h-32 p-4 text-red-400 border-4 border-red-400 border-dotted">
        <span>No Stock Prices Found!</span>
      </div>
    `;
    return;
  }
  pricesDiv.innerHTML = ""; // Clear existing content
  prices.forEach((price) => {
    if (price.avg_price !== undefined && !isNaN(price.avg_price)) {
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
      span.innerText = price.avg_price.toFixed(2); // Ensure the price is formatted correctly
      div.appendChild(h2);
      div.appendChild(span);
      pricesDiv.appendChild(div);
    } else {
      console.error("Invalid price data:", price);
    }
  });
};
