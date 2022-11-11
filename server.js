const express = require("express");
const app = express();
const assetsRouter = require("./routes/assets");
const mongoose = require("mongoose");
const messageSchema = require("./models/message");

mongoose.connect("mongodb://0.0.0.0/offers");

app.use(express.urlencoded({ extended: false }));

app.use("/assets", assetsRouter);

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("assets/index");
});

app.get("/:id", (req, res) => {
    res.render("assets/bye");
})

app.post("/send", async (req, res) => {
  let messages = new messageSchema({
    message: req.body.question,
  }); try {
      messages = await messages.save();
      res.redirect(`/assets/${messages.id}`);
  } catch (e) {
      console.log(e);
      res.render("assets/index");
  }
});

app.listen(3000, console.log("Connected"));
