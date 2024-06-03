const { Router } = require('express');
const express = require('express');
const app = express();
const router = Router();
const multer = require('multer');
const fileMiddleware = require('../../middlewares/file');
const path = require('path');
const { Card } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const user_id = res.locals.user.id;
    const cardsFromDb = await Card.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']],
    });
    const cards = JSON.parse(JSON.stringify(cardsFromDb));
    res.json(cards);
  } catch (error) {}
});

router.post('/', fileMiddleware.single('picture'), async (req, res) => {
  try {
    const { user_id, title, price, condition } = req.body;
    const pathPicture =
      'http://localhost:3000/' + req.file.path.replace('\\', '/');
    const cardData = {
      user_id,
      title,
      price,
      condition,
      pathPicture,
    };
    await Card.create({
      user_id,
      title,
      image: pathPicture,
      price,
      condition,
    });
    res.json(cardData);
    console.log(cardData);
  } catch (error) {
    console.log({ ERROR_ADD_CARD_DB: error });
  }
});

module.exports = router;
