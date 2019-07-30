const { SocketConnector, KafkaProducer } = require('@railroad/locomotive');

const stationName = process.argv[2] || 'MAIN';

// todo: better use it with a serverless function
const samplegate = LineData.gates.filter(x => x.name === 'samplegate').map(x => x.host)[0].replace(/\<placeholder\>/gim, stationName.toLowerCase());

const SampleLocomotive = () => ({
  name: 'SampleLocomotive',
  init: () => {
    throw new Error('Unimplemented Locomotive');
  },
});

module.exports = SampleLocomotive;
