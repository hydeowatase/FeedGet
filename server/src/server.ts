import express from "express";

const app = express();
const port = 3333;

app.get("/users", (req, res) => {
  return res.send("Hello World");
});

app.listen(port, () => {
  console.log(`HTTP server running and listen on port ${port}`);
});
