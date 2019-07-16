
const { operator } = require('@railroad/operator');

const SampleLocomotive = require('./locomotives/sample.locomotive');
const SampleWagon = require('./wagons/sample.wagon');

const stationName = process.argv[2];
const station = operator.station(stationName);

station.initialize((machinist, watchdog) => {

  machinist.guide({ SampleLocomotive: ['SampleWagon'] });

  watchdog.watch(SampleLocomotive, SampleWagon);

});
