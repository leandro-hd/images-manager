const routes = require("express").Router();
const multer = require("multer");
const multerConfig   = require("./config/multer");
const { Post } = require("./app/models");
const authMiddleware = require("./app/middleware/auth");

const RegisterController = require("./app/controllers/RegisterController");
const SessionController = require("./app/controllers/SessionController");

routes.post("/register", RegisterController.create);
routes.post("/sessions", SessionController.store);
routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, key, size } = req.file;

  const post = await Post.create({
    user_id: 1,
    name,
    key,
    size,
    url: `http://localhost:3333/${key}`
  });

  return res.json(post);
})

routes.use(authMiddleware);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
})

module.exports = routes;