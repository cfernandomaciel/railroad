
const { operator } = require('@railroad/operator');

const SampleLocomotive = require('./locomotives/sample.locomotive');
const SampleWagonInflux = require('./wagons/sample.wagon.influx');
const SampleWagonCourier = require('./wagons/sample.wagon.courier');

const config = require('./config');
const functions = require('./functions.map.json');

const faasConfig = config.faas;
const { host } = config;


const stationName = process.argv[2];
const station = operator.station(stationName);

const serverlessPath = 'serverless.yml';

station.initialize((machinist, watchdog, commuter) => {
  
  machinist.guide({ SampleLocomotive: ['SampleWagonInflux', 'SampleWagonCourier'] });

  commuter.faas({
    serverlessFileNamePath: serverlessPath, faasConfig, host, functions, 
  });
  
  watchdog.watch(SampleLocomotive, SampleWagonInflux, SampleWagonCourier);
  
});


process.once('SIGINT', (code) => {
  process.exit(code);
});

process.once('SIGTERM', (code) => {
  process.exit(code);
});