
const fx = require('./fx/sample');

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(fx.hello()),
  };

};

module.exports.calculate = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'the sum of 1 + 3 is: '+fx.calculate(1, 3)
      },
      null, 2
    ),
  }
}