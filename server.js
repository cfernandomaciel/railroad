
const { operator } = require('@railroad/operator');

const station = { pair: process.argv[2], exchange: process.argv[3] }; // LTCBTC


const SocketLocomotive = {
  name: 'SocketLocomotive',
  init: () => {
    console.log('initializing SocketLocomotive');
  },
};
const InfluxWagon = {
  name: 'InfluxWagon',
  init: () => {
    console.log('initializing InfluxWagon');
  },
};
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

  watchdog.watch(SocketLocomotive, InfluxWagon, CourierWagon);

});

// throws AlreadyInitializedException
// circuit.initialize((machinist, watchdog) => {
//   machinist.guide({ 'SocketLocomotive': ['InfluxWagon', 'CourierWagon'] });
//   watchdog.watch(SocketLocomotive, InfluxWagon, CourierWagon);
// });


console.log('available trains: ', JSON.stringify(circuit.trains, null, 1));
