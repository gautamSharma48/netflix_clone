const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8800;
const mongoose = require("mongoose");
const router = require("./router");

const connectDb = () => {
  mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>console.log("connected with db")).catch(err=>console.log(err))
};

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  connectDb();
  console.log("server is running");
});
