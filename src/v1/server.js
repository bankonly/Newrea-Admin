import { createServer } from "http";
import app from "./setup/Droppin";

const port = process.env.PORT || 1234;

const server = createServer(app);
console.log(port);

server.listen(port);