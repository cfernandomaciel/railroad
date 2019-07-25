
const { operator } = require('@railroad/operator');

const SampleLocomotive = require('./locomotives/sample.locomotive');
const SampleWagon = require('./wagons/sample.wagon');

const config = require('./config');
const functions = require('./functions.map.json');

const faasConfig = config.faas;
const { host } = config;


const stationName = process.argv[2];
const station = operator.station(stationName);

const serverlessPath = 'serverless.yml';

station.initialize((machinist, watchdog, commuter) => {
  
  machinist.guide({ SampleLocomotive: ['SampleWagon'] });

  commuter.faas({
    serverlessFileNamePath: serverlessPath, faasConfig, host, functions, 
  });
  
  watchdog.watch(SampleLocomotive, SampleWagon);
  
});