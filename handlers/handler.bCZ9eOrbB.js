const fx = require('./fx/fx.bCZ9eOrbB');

module.exports.ping = async (event) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify(fx.ping()),
  };

};
