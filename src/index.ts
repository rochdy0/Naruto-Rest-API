import express from "express";
import {
  QueryType,
  ResType,
  characterPost,
  characterGet,
} from "./verification";

const app = express();
const port: number = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`API is running on port ${port}.`);
});

app.get("/characters", (req, res) => {
  let query: QueryType = {character_id: req.query.character_id as string};
  characterGet(query).then((response: ResType) => {
    if (response.code === 200)
      res.status(response.code).json(response.body);
    else
      res.status(response.code).json(response);
  });
});

app.post("/characters", (req, res) => {
  const query: QueryType = {
    first_name: req.query.first_name as string,
    last_name: req.query.last_name as string,
    village: req.query.village as string,
    father_name: req.query.father_name as string,
    mother_name: req.query.mother_name as string,
  };
  characterPost(query, false).then((response: ResType) => {
    res.status(response.code).json(response);
  });
});

app.get('*', function(req, res){
  const response: ResType = {
    code: 404,
    status: 'Not Found',
    message: 'Ressource not found'
  }
  res.status(response.code).json(response);
});