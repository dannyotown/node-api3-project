const express = require("express");
const userDb = require("./userDb");
const postDb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser(), async (req, res) => {
  // do your magic!
  const postUser = await userDb.insert({ name: req.name });
  res.status(201).send(postUser);
});

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  async (req, res) => {
    const postBody = {
      text: req.text,
      user_id: req.params.id
    };
    const postToDb = await postDb.insert(postBody);
    res.status(201).send(postToDb);
  }
);

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

router.delete("/:id", validateUserId(), async (req, res) => {
  // do your magic!
  await userDb.remove(req.params.id);
  res.status(201).send({ success: "User Deleted Successfully" });
});

router.put("/:id", validateUserId(), async (req, res) => {
  // do your magic!
  await userDb.update(req.params.id, {
    name: req.body.name
  });
  res.status(201).send(await userDb.getById(req.params.id));
});

//custom middleware

function validateUserId(req, res, next) {
  return async (req, res, next) => {
    const getUserById = await userDb.getById(req.params.id);
    if (getUserById) {
      req.getUserById = getUserById;
      next();
    } else {
      res.status(400).json({ error: "User Does Not Exist" });
    }
  };
}

function validateUser(req, res, next) {
  return (req, res, next) => {
    if (!req.body.name) {
      res.status(400).json({ error: "Missing required name field" });
    } else {
      req.name = req.body.name;
      next();
    }
  };
}

function validatePost(req, res, next) {
  return (req, res, next) => {
    if (!req.body.text) {
      res.status(400).json({ error: "Invalid Post Or Update Object" });
    } else {
      req.text = req.body.text;
      next();
    }
  };
}

module.exports = router;
