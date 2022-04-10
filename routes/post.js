const express = require("express");
const router = express.Router();
const postController = require("../controller/post");

router.route("/add").post(postController.addNewPost);
router.route("/fetch").get(postController.fetchPost);
router.route("/fetch/infinite").get(postController.fetchPostByTime);

module.exports = router;
