import express from "express";
import {
  QueryType,
  ResType,
  character_post_verification,
} from "./verification";

const app = express();
const port: number = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`API is running on port ${port}.`);
});

app.get("/characters", (req, res) => {
  res.send("Test");
});

app.post("/characters", (req, res) => {
  const query: QueryType = {
    first_name: req.query.first_name as string,
    last_name: req.query.last_name as string,
    village: req.query.village as string,
    father_name: req.query.father_name as string,
    mother_name: req.query.mother_name as string,
  };
  const response: ResType = character_post_verification(query);
  res.status(response.code).json(response);
});
