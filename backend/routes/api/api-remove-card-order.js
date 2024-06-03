const express = require("express");

const { User, Card, Basket } = require("../../db/models");

const router = express.Router();

router.delete('/remove-card-order', async (req, res) => {
    try {
      const user_id = res.locals.user.id;
      console.log("USER ID:", user_id);
      if (user_id) {        
        const dbCurrCard = await Basket.findAll({where: {buyer_id: user_id},
          include: [
            User
          ]
        })
        const currCard = JSON.parse(JSON.stringify(dbCurrCard));
        console.log("CURRENT CARD: ", currCard);
        for (let i = 0; i < currCard.length; i++) {
          await Basket.destroy({where: {buyer_id: user_id}})
          await Card.destroy({where: {id: currCard[i].card_id}})
        }
        // res.sendStatus(204);
        res.json(currCard)
      }
    } catch (error) {
      // res.sendStatus(403)
      res.json({ message: error.message })
    }
  })

module.exports = router;