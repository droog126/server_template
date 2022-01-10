async function someAsyncTask() {
  return "Hey wait for me!";
}

export default (app: any) => {
  app.get("/*", async (res: any) => {
    /* Can't return or yield from here without responding or attaching an abort handler */
    res.onAborted(() => {
      res.aborted = true;
    });

    /* Awaiting will yield and effectively return to C++, so you need to have called onAborted */
    let r = await someAsyncTask();

    /* If we were aborted, you cannot respond */
    if (!res.aborted) {
      res.end(r);
    }
  });
};
