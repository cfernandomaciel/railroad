
const { Operator } = require('@railroad/operator');

const pubSubLocomotive = Object.assign({}, require('./locomotives/pubsub.locomotive')());
const socketLocomotive = Object.assign({}, require('./locomotives/socket.locomotive')());

const influxWagon      = Object.assign({}, require('./wagons/influx.wagon')());
const courierWagon     = Object.assign({}, require('./wagons/courier.wagon')());

pubSubLocomotive.init();
socketLocomotive.init();

influxWagon.init();
courierWagon.init();

const watchdog = Operator.watchdog();

watchdog.initialize(machinist => {

  machinist.guide({ 'PubSubLocomotive': ['InfluxLocomotive', 'CourierWagon'] });
  machinist.guide({ 'SocketLocomotive': ['InfluxLocomotive', 'CourierWagon'] });

});

Operator.watch(pubSubLocomotive);
Operator.watch(socketLocomotive);

Operator.watch(influxWagon);
Operator.watch(courierWagon);