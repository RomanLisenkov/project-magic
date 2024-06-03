require('@babel/register');
const express = require('express');
const serverConfig = require('./serverConfig/serverConfig');
const cors = require('cors');
const apiGetUser = require('./routes/api/api-get-user');
const cardsRoute = require('./routes/api/cards.route');
const apiCardByCity = require('./routes/api/api-cards-by-city')

// const { sequelize } = require('./db/models');
const PORT = 3000;
const app = express();
//all main middlewares
serverConfig(app);

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['PUT', 'POST', 'GET', 'DELETE'],
  credentials: true
}));


// routers imports
const apiRegister = require('./routes/api/api-register-login-logout');
const getAllCards = require('./routes/api/api-get-all-items')
const apiAddCardToBasket = require('./routes/api/api-add-card-to-basket')
const getCartCards = require('./routes/api/api-get-cart-items');
const apiRemoveCardFromBasket = require('./routes/api/api-remove-card-from-cart');
const apiUserSession = require('./routes/api/api-user-session')
const apiCheckout = require('./routes/api/api-remove-card-order');


// app.get('/get', (req, res) => {
//   res.json({ message: 'hello' });
// });

app.use('/', apiRegister);
app.use("/", getAllCards)
app.use('/', apiAddCardToBasket)
app.use('/', getCartCards);
app.use('/', apiRemoveCardFromBasket)
app.use('/cards', cardsRoute);
app.use('/', apiGetUser);
app.use('/', apiCardByCity);
app.use("/", apiUserSession);
app.use('/', apiCheckout);
// sequelize.authenticate(); 
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
