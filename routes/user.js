const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config({ path: "../.env" });

const sgMail = require("@sendgrid/mail");
const User = require("../models/User");
const Invitation = require("../models/Invitation");

sgMail.setApiKey(process.env.EMAIL_KEY);

//POST create a user invitation
router.post("/:id/invitation", async (req, res) => {
  const referrer = req.params.id;
  try {
    const user = await User.findById(referrer);

    if (!user) {
      res.send("User not found");
    }
    const emails = req.body.emailList;

    //for each email create an invitation instance
    for (const email of emails) {
      console.log("email:", email);
      //determine if referrer already sent invitation to receiver
      const invitations = await Invitation.find({ toEmail: email });

      const invitationAlreadySent = invitations.find(
        (invitation) => invitation.referrer.toString() === referrer
      );

      if (invitationAlreadySent) {
        console.log("Invitation already sent");
      } else {
        const newInvitation = new Invitation({
          referrer: user,
          toEmail: email,
        });

        await newInvitation.save();
      }
    }

    res.json(emails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST send a user invitation
router.post("/:id/invitation/send", async (req, res) => {
  try {
    //locate user from parameter
    const user = await User.findById(req.params.id);
    console.log("user:", user);

    if (!user) {
      res.send("User not found");
    }

    const msg = {
      to: req.body.emailList,
      from: "teamcocoapuffs1@gmail.com",
      subject: "Chat-App: A friend has invited you to chat!",
      text: `Your friend ${user.email} is asking you to join our platform at http://localhost:3000`,
    };
    console.log("msg:", msg);

    sgMail.send(msg, (err, info) => {
      if (err) {
        return console.error("Email not sent");
      }
      res.json({ msg: "Email sent!" });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
