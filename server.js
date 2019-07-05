
const { operator } = require('@railroad/operator');

const SocketLocomotive = require('./locomotives/socket.locomotive');
const InfluxWagon = require('./wagons/influx.wagon');
const CourierWagon = require('./wagons/courier.wagon');


const station = { pair: process.argv[2], exchange: process.argv[3] }; // LTCBTC


const line = operator.line(`${station.exchange}-${station.pair}`);

line.initialize((machinist, watchdog) => {

  machinist.guide({ SocketLocomotive: ['InfluxWagon', 'CourierWagon'] });

  watchdog.watch(SocketLocomotive, InfluxWagon, CourierWagon);

});
