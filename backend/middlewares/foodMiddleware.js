const Food = require('../models/Food');

async function foodMiddleware(req, res, next) {
  try {
    const food = await Food.find();
    res.locals.food = food;
    next();
  } catch (error) {
    console.error('Error fetching food items:', error);
    next(error);
  }
}

module.exports = foodMiddleware;
