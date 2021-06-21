const {
  // createUser,
  findUserById,
  updateUserById,
  deleteUserById,
  createResultById,
  getResultById,
  getAllUsers,
  createCommnet,
  createGuest,
  createContent,
  getAllContents,
  getSortByTag,
} = require("../functions/index");
const jwt = require("jsonwebtoken");

const { uploadManyFile } = require("../utils/s3");
// find user by id
exports.findUserById = async (req, res) => {
  try {
    const { userId } = req;
    const user = await findUserById(userId);
    res.send(user);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

//update user by id
exports.updateUserById = async (req, res) => {
  try {
    const { userId } = req;
    const updateUser = await updateUserById(req.body, userId);
    res.send(updateUser);
  } catch (err) {
    console.log("err:", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req;
    const deleteUser = await deleteUserById(userId);
    res.send(deleteUser);
  } catch (err) {
    console.log("err:", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};
exports.createResultById = async (req, res) => {
  try {
    const { userId } = req;
    const answers = req.body.question_data;
    const user = await createResultById(answers, userId);
    res.send(user);
  } catch (err) {
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.postComment = async (req, res) => {
  try {
    const { userId } = req;
    const comment = await createCommnet(req.body, userId);
    res.send(comment);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.createGuest = async (req, res) => {
  try {
    const guest = await createGuest(req.body);
    res.send(guest);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getResultById = async (req, res) => {
  try {
    const { userId } = req;
    const user = await getResultById(userId);
    res.send(user);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.postContent = async (req, res) => {
  try {
    const { userId, username } = req;
    const content = await createContent(req.body, userId, username);
    res.send(content);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getAllContents = async (req, res) => {
  try {
    const contents = await getAllContents();
    res.send(contents);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};

exports.getSortByTag = async (req, res) => {
  try {
    const contents = await getSortByTag(req.body.tag);
    res.send(contents);
  } catch (err) {
    console.log("err: ", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
  }
};


exports.postImage = async (req, res) => {
  //J calling
  const { userId,files} = req;
  console.log(userId)
  console.log("flies",files)
  const result = await uploadManyFile(files, userId, "userResult");
  console.log(result);
  res.send(result);
}
