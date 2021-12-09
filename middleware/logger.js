const moment = require("moment");


// Creating middleware:
const logger = (
  req,
  res,
  next // next or last are used in the navigation in the middleware stack
) => {
  // console.log('Hello') // Hello in the terminal, everytime the page is visited
  console.log(
    `${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format}`
  ); // gives url and the time visited in the terminal
  next();
};
module.exports = logger