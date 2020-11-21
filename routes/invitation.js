const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');
const User = require('../models/User');
const auth = require('../middleware/auth');

//PUT request to approve invitation PRIVATE ROUTE
router.put('/:id/approve', auth, async (req, res) => {
  const invitationId = req.params.id;
  try {
    const invitation = await Invitation.findById(invitationId);

    //check if invitation exists
    if (!invitation) {
      res.status(404).send('Invitation not found');
    }

    //change status to approved if pending
    if (invitation.status === 'pending') {
      invitation.status = 'approved';

      //if so, conver their invitation to approved too.
    } else {
      return res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    const sender = await User.findById(invitation.referrer);

    if (!sender) {
      return res.status(404).send('User not found');
    }

    const receiver = await User.findOne({ email: invitation.toEmail });

    //receiver is not a member of the platform
    if (!receiver) {
      // TODO: APPROVE NEW USER INVITE
      console.log('new user approval');
    }

    //receive is already a member and this is a friend request
    else {
      //if sender or receiver are already friends
      const alreadyFriends1 = sender.contacts.find(
        (friend) => friend.email.toString() === receiver.email,
      );
      const alreadyFriends2 = receiver.contacts.find(
        (friend) => friend.email.toString() === sender.email,
      );

      if (!alreadyFriends1 && !alreadyFriends2) {
        console.log('sender.contacts:', sender.contacts);
        console.log('receiver.contacts:', receiver.contacts);
        // sender.contacts.push(receiver);
        // receiver.contacts.push(sender);
        // sender.contacts = [...sender.contacts, receiver];
        // receiver.contacts = [...receiver.contacts, sender];
        const newSenderContacts = [...sender.contacts, receiver.toObject()];
        const newReceiverContacts = [...receiver.contacts, sender.toObject()];
        console.log('newSenderContacts:', newSenderContacts);
        console.log('newReceiverContacts:', newReceiverContacts);

        sender.contacts = newSenderContacts;
        receiver.contacts = newReceiverContacts;
      } else {
        return res.status(400).json({ msg: 'Users already connected' });
      }
    }

    //check if sender has an invitation from the receiver and set it to approved
    const receiverInvitationToUser = await Invitation.findOne({
      toEmail: sender.email,
      referrer: receiver.id,
    });
    if (receiverInvitationToUser) receiverInvitationToUser.status = 'approved';

    await invitation.save();

    await receiverInvitationToUser.save();

    await sender.save();

    await receiver.save();

    res.status(200).json({ invitation, sender, receiver });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//PUT request to reject invitation PRIVATE ROUTE
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const invitation = await Invitation.findById(req.params.id);

    if (!invitation) {
      res.status(404).send('Invitation not found');
    }

    if (invitation.status === 'pending') {
      invitation.status = 'rejected';
    } else {
      res
        .status(400)
        .json({ msg: `Invitation status already ${invitation.status}` });
    }

    await invitation.save();
    res.status(200).json({ invitation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
