const express = require("express");
const postDb = require("./postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  const getPosts = await postDb.get();
  res.status(200).send(getPosts);
});

router.get("/:id", validatePostId(), async (req, res) => {
  // do your magic!
  const getPostById = await postDb.getById(req.params.id);
  res.status(200).send(getPostById);
});

router.delete("/:id", validatePostId(), async (req, res) => {
  // do your magic!
  await postDb.remove(req.params.id);
  res.status(201).send({ sucess: "Post Deleted Successfully" });
});

router.put("/:id", validatePostId(), async (req, res) => {
  await postDb.update(req.params.id, { text: req.body.text });
  res.status(201).send({ sucess: "Post Updated Succesfully" });
});

// custom middleware

function validatePostId(req, res, next) {
  return async (req, res, next) => {
    const PostById = await postDb.getById(req.params.id);
    if (PostById) {
      req.PostById = PostById;
      next();
    } else {
      res.status(400).json({ error: "Post Does Not Exist" });
    }
  };
}

module.exports = router;
