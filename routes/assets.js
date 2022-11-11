const express = require("express");
const router = express.Router();
const Asset = require("./../models/asset");
const nodemailer = require("nodemailer");

router.get("/safari", (req, res) => {
  res.render("assets/safari");
});

router.get("/wedding", (req, res) => {
  res.render("assets/wedding");
});

router.get("/meeting", (req, res) => {
  res.render("assets/meeting");
});

router.get("/offer", (req, res) => {
  res.render("assets/offer");
});

router.get("/featured", (req, res) => {
  res.render("assets/featured");
});

router.get("/weddingoffer", (req, res) => {
  res.render("assets/weddingoffer");
});

router.get("/meetingvenue", (req, res) => {
  res.render("assets/meetingvenue");
});

router.get("/exclusiveoffers", (req, res) => {
  res.render("assets/exclusiveoffers");
});

router.get("/:id", (req, res) => {
  res.render("assets/message");
});

router.post("/", async (req, res) => {
  let asset = new Asset({
    email: req.body.email,
    phoneNumber: req.body.phone,
    checkOut: req.body.date,
    adults: req.body.adult,
    children: req.body.child,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "brucewynentreprices@gmail.com",
      pass: "bklfqowqaqieqzfg",
    },
  });

  var mailOptions = {
    from: "brucewynentreprices@gmail.com",
    to: "karlielinux@gmail.com",
    subject: "NEW BOOKING ALERT",
    text: `A new order was made on ${req.body.wedding}
          Details of the Order
    Email: ${req.body.email}
    Phone Number: ${req.body.phone}
    Checkout Date: ${req.body.date}
    Adult: ${req.body.adult}
    Children: ${req.body.child}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Sent: " + info.response);
    }
  });
  try {
    asset = await asset.save();
    res.redirect(`/assets/${asset.id}`);
  } catch (e) {
    console.log(e);
    res.render("assets/index");
  }
});

module.exports = router;
