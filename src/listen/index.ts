const { encode, decode } = require("msgpack5")();
import { router } from "../wsRouter/index";

export function listen(buffer: any, socket: any) {
  try {
    const data = decode(buffer);
    router(data, socket);
    return data;
  } catch (error) {
    console.log("数据处理失败");
  }
}
