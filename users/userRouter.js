const express = require("express");
const userDb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", async (req, res) => {
  // do your magic!
  const getUsers = await userDb.get();
  res.send(getUsers);
});

router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).send(req.getUserById);
});

router.get("/:id/posts", validateUserId(), async (req, res) => {
  const getUserPost = await userDb.getUserPosts(req.getUserById.id);
  res.status(200).send(getUserPost);
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  return async (req, res, next) => {
    const getUserById = await userDb.getById(req.params.id);
    if (getUserById) {
      req.getUserById = getUserById;
      next();
    } else {
      res.status(404).json({ error: "User Does Not Exist" });
    }
  };
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
