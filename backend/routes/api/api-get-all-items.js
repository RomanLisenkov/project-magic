const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/all-items', async (req, res) => {
  try {
    const isPresented = await db.Card.findAll();
    const parsedCard = JSON.parse(JSON.stringify(isPresented))
    // console.log(parsedCard)
    
      res.status(201).json(parsedCard)
  
  } catch (error) {
    console.log('ERROR TO GET ALL CARDS BACK: ', error);
  }
});

module.exports = router