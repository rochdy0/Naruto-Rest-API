import express from "express";

const app = express();
const port: number = 3000;

app.listen(port, () => {
  console.log(`API is running on port ${port}.`);
});

app.get("/", (req, res) => {
  res.send("Test");
});
