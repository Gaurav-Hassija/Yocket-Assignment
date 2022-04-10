const { ValidationError, InternalError } = require("../error");
const Post = require("../models/post");

const addNewPost = async (req, res, next) => {
  try {
    const response = await Post.create(req.body);
    res.status(200).json({ response });
  } catch (err) {
    if (err.name === "ValidationError") {
      const error = new ValidationError(err.message);
      next(error);
    } else {
      next(new InternalError());
    }
  }
};

const fetchPost = async (req, res, next) => {
  try {
    const count = req.query.count || 0;
    const offset = Number(req.query.offset) || 0;
    const skip = offset * count;
    const response = await Post.find()
      .sort({ _id: "-1" })
      .limit(count)
      .skip(skip);
    res.status(200).json({ response });
  } catch (err) {
    next(new InternalError(err));
  }
};

const fetchPostByTime = async (req, res, next) => {
  try {
    const startTimeObjectId = req.query.id;
    const startTime = dateFromPostId(req.query.id);
    const endTime = new Date(startTime.setHours(startTime.getHours() - 2));
    const endTimeObjectId = idToDate(endTime);
    const response = await Post.find({
      $and: [
        { _id: { $lt: startTimeObjectId } },
        { _id: { $gte: endTimeObjectId } },
      ],
    }).sort({ _id: "-1" });
    res.status(200).json({ response });
  } catch (err) {
    next(new InternalError(err));
  }
};

const idToDate = (date) => {
  return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

const dateFromPostId = (postId) => {
  return new Date(parseInt(postId.toString().substring(0, 8), 16) * 1000);
};

module.exports = {
  addNewPost,
  fetchPost,
  fetchPostByTime,
};
