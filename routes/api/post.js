const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");

//@access Private
//@desc   create a post
//@route  POST /api/post
routes.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  },
);

//@access Private
//@desc   get all post
//@route  GET /api/post
routes.get("/", async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@access Private
//@desc   get post by ID
//@route  GET /api/post/:post_id
routes.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    return res.status(500).send("Server Error");
  }
});

//@access Private
//@desc   delete the post
//@route  DELETE /api/post/:post_id
routes.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.deleteOne();

    res.json({ msg: "post removed" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@access Private
//@desc   PUT like the post
//@route  PUT /api/post/like/:id
routes.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post has been already liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json({ msg: "post liked" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@access Private
//@desc   PUT Unlike the post
//@route  PUT /api/post/unlike/:id
routes.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if post has been already liked

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();

    res.json({ msg: "post has been unliked" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//@access Private
//@desc   post Add comment to the post
//@route  POST /api/post/comment/:id/
routes.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newPost = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newPost);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  },
);

//@access Private
//@desc   post remove comment to the post
//@route  POST /api/post/comment/:id/:comment_id
routes.post("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //pull out the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id,
    );

    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    //check the user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //check the index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = routes;
