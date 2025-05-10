const WebSocket = require("ws");
const express = require("express");
const productsRouter = require("./productsRouter");

let wss;

const handleWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket connection established");

    ws.on("message", async (message) => {
      try {
        if (typeof message !== "string") {
          message = message.toString();
        }

        console.log("Received Message:", message);

        const parsedMessage = message.toLowerCase();
        let params = {};

        // Identify Intent
        const intent = getIntent(parsedMessage);

        console.log("Identified Intent:", intent);

        // Handle Non-Product Intents (e.g., Greetings, Farewells)
        if (intent === "GREETING") {
          const msg = {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            message: "Hello! How can I assist you today?",
            items: [],
          };
          ws.send(JSON.stringify(msg));
          return;
        }

        if (intent === "FAREWELL") {
          const msg = {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            message: "Goodbye! Feel free to ask anytime.",
            items: [],
          };
          ws.send(JSON.stringify(msg));
          return;
        }

        // Handle Product-Related Intents
        if (intent === "SKU_SEARCH") {
          const skuMatch = parsedMessage.match(/sku\s+(\w+)/);
          if (skuMatch) params.search = skuMatch[1];
        }

        if (intent === "TYPE_SEARCH") {
          const typeMatch = parsedMessage.match(/(t-shirt|skirt|hoodie|top|accessories)/);
          if (typeMatch) params.type = typeMatch[1];
        }

        if (intent === "PRICE_SEARCH") {
          const priceUnderMatch = parsedMessage.match(/under\s+\$?(\d+)|below\s+\$?(\d+)|less\s+than\s+\$?(\d+)/);
          const priceAboveMatch = parsedMessage.match(/above\s+\$?(\d+)|more\s+than\s+\$?(\d+)/);

          if (priceUnderMatch) {
            const priceValue = priceUnderMatch[1] || priceUnderMatch[2] || priceUnderMatch[3];
            params.price = `<${priceValue}`;
          } else if (priceAboveMatch) {
            const priceValue = priceAboveMatch[1] || priceAboveMatch[2];
            params.price = `>${priceValue}`;
          }
        }
        if (intent === "DISPLAY_ALL") {
          params = {}; // No filters
        }

        console.log("Constructed Params:", params);

        // If no valid product-related intent, return generic response
        if (Object.keys(params).length === 0) {
          const msg = {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            message: "Sorry, I didn't understand that. Try searching by SKU, type, or price.",
            items: [],
          };
          ws.send(JSON.stringify(msg));
          return;
        }

        // Create request-like object
        const req = {
          method: "GET",
          url: "/fetchItems",
          query: params,
        };

        const res = {
          json: (data) => {
            console.log(params);
            const finalRes = {
              currentPage: data.currentPage || 1,
              totalPages: data.totalPages || 1,
              totalItems: data.totalItems || 0,
              message: "Here are some suggestions.",
              items: data.items || [],
              params: params,
            };
            ws.send(JSON.stringify(finalRes));
          },
          status: (statusCode) => {
            console.log(`Status: ${statusCode}`);
            return res;
          },
        };

        // Call the productsRouter
        productsRouter(req, res, () => {
          console.log("Request processed by productsRouter.");
        });
      } catch (err) {
        ws.send(JSON.stringify([{ message: "Error processing your request" }]));
        console.error("Error in WebSocket:", err.message);
      }
    });
  });
};

const getIntent = (message) => {
  if (/\bhello\b|\bhi\b|\bhey\b/.test(message)) return "GREETING";
  if (/\bgoodbye\b|\bbye\b|\bsee you\b/.test(message)) return "FAREWELL";
  if (/sku\s+\w+/.test(message)) return "SKU_SEARCH";
  if (/(t-shirt|skirt|hoodie|top|accessories)/.test(message)) return "TYPE_SEARCH";

  if (/under\s+\$?\d+|below\s+\$?\d+|less\s+than\s+\$?\d+|more\s+than\s+\$?\d+|above\s+\$?\d+/.test(message)) {
    return "PRICE_SEARCH";
  }

  if (/all|show all|display all/.test(message)) return "DISPLAY_ALL";

  return "UNKNOWN";
};

module.exports = handleWebSocket;
