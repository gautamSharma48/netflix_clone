const express = require("express");
const router = express.Router();
const { register } = require("../controller/auth");

//auth

router.post("/api/auth/register",register);

//user-routes

//movies-routes

//list-routes

module.exports = router;
