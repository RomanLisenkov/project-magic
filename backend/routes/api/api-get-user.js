const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/user', (req, res) => {
  try {
    console.log(res.locals.user);
    if (res.locals.user) {
      res.json({ user: res.locals.user });
    } else {
      res.json({ message: 'User not found' });
    }
  } catch (error) {
    console.log({ ERROR_GET_USER: error });
  }
});

module.exports = router;
