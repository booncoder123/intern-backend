
const mongoose = require('mongoose')

const {
    createUser,
    findUserById,
    updateUserById,
    deleteUserById,
    createResultById,
    getResultById,
    getAllUsers,
    createCommnet,
    createGuest
  
  } = require("../functions/index");

//create user
exports.createUsers = async (req, res) => {
    try {
      const user = await createUser(req.body);
      res.send(user);
    } catch (err) {
      console.log("err: ", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  
  // find user by id
exports.findUserById =  async (req, res) => {
    try {
      const userData = await findUserById(req.params.id);
      res.send(userData);
    } catch (err) {
      console.log("err: ", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  
  //update user by id
  exports.updateUserById = async (req, res) => {
    try {
      const updateUser = await updateUserById(req.body, req.params._id);
      res.send(updateUser);
    } catch (err) {
      console.log("err:", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  
  exports.deleteUserById =  async (req, res) => {
    try {
      const deleteUser = await deleteUserById(req.params._id);
      res.send(deleteUser);
    } catch (err) {
      console.log("err:", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  exports.createResultById =  async (req, res) => {
    try {
      const userid = req.params.id
      const answers = req.body.answers
      const user = await createResultById(answers,userid);
      res.send(user);
    } catch (err) {
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  

exports.getAllUsers = async (req, res) => {
    try {
      const users = await getAllUsers();
      res.send(users);
    } catch (err) {
      console.log("err: ", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  
exports.postComment = async (req, res) => {
    try {
      const comment = await createCommnet(req.body);
      res.send(comment);
    } catch (err) {
      console.log("err: ", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  
  exports.createGuest = async (req, res) => {
    try {
      const guest = await createGuest(req.body);
      res.send(guest);
    } catch (err) {
      console.log("err: ", err);
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }
  


exports.getResultById =  async (req, res) => {
    try {
      const userid = req.params.id
  
      const user = await getResultById(userid);
      res.send(user);
    } catch (err) {
      res.status(err.status || 500).send(err.message || "Internal Server Error");
    }
  }