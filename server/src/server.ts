import express from "express";
import { routes } from "./routes";

const app = express();
app.use(express.json());

app.use(routes);

const port = 3335;

app.listen(port, () => {
  console.log(`HTTP server running and listen on port ${port}`);
});
