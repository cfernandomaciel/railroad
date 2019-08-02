const fx = require('./fx/fx.bCZ9eOrbB');

module.exports.exchangewebsockets = async (event) => {
  
  const body = (typeof event.body === 'string') ? JSON.parse(event.body) : event.body;
  const { gates, station, desiredGates } = body;
  
  return {
    statusCode: 200,
    body: JSON.stringify(fx.exchangewebsockets(gates, station, desiredGates)),
  };

};
