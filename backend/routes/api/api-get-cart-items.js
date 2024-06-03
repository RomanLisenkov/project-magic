const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/cart-items', async (req, res) => {
  try {
    const { user } = res.locals;
    // const isPresented = await db.Card.findAll();
    const isPresented = await db.Card.findAll({
      include: [
        {
          model: db.Basket,
          where: {buyer_id: user.id}
        }
      ]
    });
    const parsedCard = JSON.parse(JSON.stringify(isPresented))
    console.log(parsedCard)
    
      res.status(201).json(parsedCard)
  
  } catch (error) {
    console.log('ERROR TO GET CART CARDS: ', error);
  }
});

module.exports = router