const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.post('/search-by-city', async (req, res) => {
  try {
    const { city } = req.body;
    console.log('CITYYYY ', city);


    const cardByCity = await db.Card.findAll({
      include: [{
        model: db.User,
        where: { city: city } 
      }]
    });

    const parsed = JSON.parse(JSON.stringify(cardByCity));
    console.log(parsed);

    res.status(201).json(parsed);
  } catch (error) {
    console.log('ERROR TO GET CARDS BY CITY BACK: ', error);
  }
});

module.exports = router;
