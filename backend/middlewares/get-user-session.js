const db = require('../db/models');

//we use thatfunctoin in order to chek if any session is presented. If yes => we find from DB user who opened session belongs to and add that user to global res.localsuser. Then we pass that object as argument to the each compnent. That give us chance make renderind of particular user + chanse to perform conditional rendering if user session onepen

const userSession = async (req, res, next) => {
  try {
   
    if (req.session?.user_sid) {
      const user = await db.User.findByPk(req.session.user_sid);
      res.locals.user = user ? user.get() : null; //* метод get() == raw: true == JSON.parse(JSON.stringify(user)) == toJson()
      
    } else {
      res.locals.user = null;
    }
    
    next();
  } catch (error) {
    console.log('USER NOT FOUND MIDDLEWARE: ', error);
    next();
  }
};

module.exports = userSession;
