// import { createClient } from "redis";

// async function redisJSONDemo() {
//   try {
//     const TEST_KEY = "test_node";

//     const client = createClient();
//     await client.connect();

//     // RedisJSON uses JSON Path syntax. '.' is the root.
//     await client.json.set(TEST_KEY, ".", { node: 4303 });
//     const value = await client.json.get(TEST_KEY, {
//       // JSON Path: .node = the element called 'node' at root level.
//       path: ".node",
//     });

//     console.log(`value of node: ${value}`);

//     await client.quit();
//   } catch (e) {
//     console.error(e);
//   }
// }

// redisJSONDemo();
import { App, SHARED_COMPRESSOR } from "./uWebSockets.js";
import { listen } from "./listen/index";

const port = 9001;
const app = App();

app.ws("/*", {
  compression: SHARED_COMPRESSOR,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  /* Handlers */
  open: (ws) => {
    console.log("A WebSocket connected!");
  },
  message: (socket, data, isBinary) => {
    // console.log(socket, data, isBinary);
    listen(data, socket);
  },
  drain: (ws) => {
    console.log("WebSocket backpressure: " + ws.getBufferedAmount());
  },
  close: (ws, code, message) => {
    console.log("WebSocket closed");
  },
});

app.listen(port, (token) => {
  if (token) {
    console.log("Listening to port " + port);
  } else {
    console.log("Failed to listen to port " + port);
  }
});
