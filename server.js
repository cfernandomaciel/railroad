
const { operator } = require('@railroad/operator');
const SocketLocomotive = require('./locomotives/socket.locomotive');
const InfluxWagon = require('./wagons/influx.wagon');

const station = { pair: process.argv[2], exchange: process.argv[3] }; // LTCBTC

const CourierWagon = {
  name: 'CourierWagon',
  init: () => {
    console.log('initializing CourierWagon');
  },
};

// it comes from process.argv[]
const circuit = operator.circuit(`${station.exchange}-${station.pair}`);


circuit.initialize((machinist, watchdog) => {

  // machinist.guide(); // throws UnimplementedCallbackException 

  machinist.guide({ SocketLocomotive: ['InfluxWagon', 'CourierWagon'] });
  // machinist.guide({ PubsubLocomotive: ['InfluxWagon', 'CourierWagon'] });

  const socketLocomotive = Object.assign({}, SocketLocomotive());
  const influxWagon = Object.assign({}, InfluxWagon());

  watchdog.watch(socketLocomotive, influxWagon, CourierWagon);

});

// throws AlreadyInitializedException
// circuit.initialize((machinist, watchdog) => {
//   machinist.guide({ 'SocketLocomotive': ['InfluxWagon', 'CourierWagon'] });
//   watchdog.watch(SocketLocomotive, InfluxWagon, CourierWagon);
// });


console.log('available trains: ', JSON.stringify(circuit.trains, null, 1));
