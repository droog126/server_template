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
// import { App } from "./uWebSockets.js";
// const { App } = require("./uWebSockets.js");

// console.log(App());
const uWS = require("./uWebSockets.js");
const port = 9001;

const app = uWS./*SSL*/App({
  key_file_name: 'misc/key.pem',
  cert_file_name: 'misc/cert.pem',
  passphrase: '1234'
}).get('/*', (res, req) => {
  res.end('Hello World!');
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});
// import { Server } from "socket.io";

// // @ts-ignoreconst
// const app = new App();
// const io = new Server();

// io.attachApp(app);

// io.on("connection", (socket) => {
//   // ...
// });

// app.listen(3000, (token: any) => {
//   if (!token) {
//     console.warn("port already in use");
//   }
// });
