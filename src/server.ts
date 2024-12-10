import { Server } from "http";
import app from "./app";

const port = 3000;
const main = () => {
  const server: Server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

main();
