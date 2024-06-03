const express = require("express");

const { Card, Basket } = require("../../db/models");

const router = express.Router();

router.delete('/remove-from-basket', async (req, res) => {
    try {
      const { card_id, user_id } = req.body;
    //   console.log("REQ BODY: ", req.body);
      console.log("CARD ID: ", card_id);
      console.log("USER ID: ", user_id)
      await Basket.destroy({ where: { card_id } })

      const dbRemains = await Card.findAll({
        include: [{
          model: Basket,
          where: { buyer_id: res.locals.user.id } 
        }]
      });
      const remains = JSON.parse(JSON.stringify(dbRemains));
      console.log("REMAINS: ", remains);
      // res.sendStatus(204);
      res.json( remains );
    } catch (error) {
      // res.sendStatus(403)
      res.json({ message: error.message })
    }
  })

module.exports = router;