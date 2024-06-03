const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, city } = req.body;
    console.log(name, email, password, city);
    const isPresented = await db.User.findOne({ where: { email } });
    if (!isPresented) {
      const hashedPass = await bcrypt.hash(password, 10);

      const newRegisty = await db.User.create({ name, email, password: hashedPass, city });
      req.session.user_sid = newRegisty.id;
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('ERROR TO REGISTER NEW USER BACK: ', error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const isPresented = await db.User.findOne({ where: { email } });
    const isPasswordMatch = await bcrypt.compare(
      password,
      isPresented?.password
    );

    if (isPresented && isPasswordMatch) {
      req.session.user_sid = isPresented.id;
      
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log('SOMTHING WRONG WITH LOGIN BACK: ', error);
  }
});




router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'ERROR LOGOUT USER' });
    }
    // res.clearCookie('user_sid').redirect('/');
    res.status(302).clearCookie('user_sid').json({message:'OK'})
  });
});
module.exports = router; 
