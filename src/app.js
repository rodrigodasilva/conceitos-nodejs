const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const repository = request.body;

  const id = uuid();
  const likes = 0;

  const newRepository = {
    id,
    ...repository,
    likes,
  };

  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: "Repository not found" });
  }

  const { likes } = repositories[repositoryIndex];

  repositories[repositoryIndex] = { id, ...request.body, likes };

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
