const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const bcrypt = require('bcrypt');

router.get('/user-session', async (req, res) => {
  try {
    const user = res.locals?.user
    res.json(user)
   
  } catch (error) {
    console.log('ERROR TO REGISTER NEW USER BACK: ', error);
  }
});

module.exports = router