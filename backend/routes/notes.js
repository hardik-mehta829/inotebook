const express = require('express');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();

router.get('/allnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json({ notes });
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.post(
  '/addnote',
  body('title').isLength({ min: 3 }),
  body('description').isLength({ min: 5 }),
  fetchUser,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    try {
      const UserId = req.user;

      const { title, description, tag } = req.body;
      const note = await Note.create({
        user: UserId,
        title,
        description,
        tag,
      });
      await note.save();
      res.json({ note });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);
router.delete('/deletenote/:noteid', fetchUser, async (req, res) => {
  try {
    let note = await Note.find({ _id: req.params.noteid });

    if (!note[0]) return res.status(400).json({ error: 'No note found' });
    const userId = note[0].user.toString();

    if (userId !== req.user)
      return res.status(401).json({ error: 'Access denied' });
    const result = await Note.findOneAndDelete({ _id: req.params.noteid });
    res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
router.post('/updatenote/:noteid', fetchUser, async (req, res) => {
  try {
    let note = await Note.find({ _id: req.params.noteid });
    if (!note) return res.status(400).json({ error: 'No note found' });
    const userId = note[0].user.toString();
    console.log(userId);
    if (userId !== req.user)
      return res.status(401).json({ error: 'Access denied' });
    const update = req.body;
    note = await Note.findOneAndUpdate({ _id: req.params.noteid }, update, {
      new: true,
    });
    res.json({ note });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = router;
