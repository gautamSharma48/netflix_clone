const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/auth");
const { updateUser, getUser, getAllUser, deleteUser, stats } = require("../controller/user");
const { createMovie ,updateMovie , deleteMovie, getMovie, getAllMovie }=require("../controller/movie");
const { verifyToken } = require("../middleware");


//auth
router.post("/api/auth/register", register);
router.post("/api/auth/login", login);

//user-routes
router.get("/api/user/:id", getUser);
router.get("/api/user",verifyToken,getAllUser);
router.put("/api/user/:id",verifyToken, updateUser);
router.delete("/api/user/:id",verifyToken, deleteUser);
router.get("/api/user/stats",stats);

//movies-routes
router.get("/api/movie",getAllMovie);
router.get("/api/movie/:id",getMovie);
router.post("/api/movie",verifyToken,createMovie);
router.put("/api/movie/:id",verifyToken,updateMovie);
router.delete("/api/movie/:id",verifyToken,deleteMovie);

//list-routes

module.exports = router;
