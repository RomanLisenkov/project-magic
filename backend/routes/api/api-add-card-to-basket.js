// const express = require('express');
// const router = express.Router();
// const db = require('../../db/models');

// router.post('/add-to-basket', async (req, res) => {
//   try {
//     const buyer_id = res.locals.user
//     console.log('BUYER_ID: ', buyer_id);
//     const {user_id, card_id} = req.body
    // const addToBasket = await db.Basket.create({user_id, card_id});
//     console.log(parsedCard)
    
//       res.status(201).json(parsedCard)
  
//   } catch (error) {
//     console.log('ERROR TO ADD CARD TO BASKET: ', error);
//   }
// });

// module.exports = router


//!------------------------------------------------------------------------------
const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.post('/add-to-basket', async (req, res) => {
  try {
    const buyer_id = res.locals.user.id
    console.log('BUYER_ID: ', buyer_id);
    const {user_id, card_id} = req.body

    // const addToBasket = await db.Basket.create({user_id, card_id});
    const parsedCard = await db.Basket.create({user_id, card_id, buyer_id});
    // console.log(parsedCard)

      res.status(201).json(parsedCard)
  
  } catch (error) {
    console.log('ERROR TO ADD CARD TO : ', error);
  }
});

module.exports = router