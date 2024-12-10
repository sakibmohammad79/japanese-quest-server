import { Server } from "http";
import app from "./app";
import config from "./config";

const main = () => {
  const server: Server = app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
  });
};

main();
