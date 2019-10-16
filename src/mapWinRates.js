const { HLTV } = require('hltv');
const fs = require('fs');

const mapCodes = {
  Inferno: 'inf',
  Dust2: 'd2',
  Cache: 'cch',
  Nuke: 'nuke',
  Train: 'trn',
  Overpass: 'ovp',
  Mirage: 'mrg',
  Cobblestone: 'cbl'
};

const majorIds = [1270, 1333, 1444, 1553, 1611, 1666, 1617, 2027, 2062, 2471, 2720, 3247, 3564, 3883, 4443];

var eventWinRates = {};

var eventDataText = fs.readFileSync("EventsData.json");
var eventData = JSON.parse(eventDataText);

async function getWinRates(eventId) {
  mapData = await HLTV.getEventMaps({id: eventId});

  console.log(eventId + ' - ' + JSON.stringify(mapData) + '\n\n');

  for(const event of eventData) {
    if(event.id == eventId) {
      eventWinRates[event.name] = {
        mapsPlayed: mapData.mapsPlayed,
        winRates: mapData.winRates
      }
    }
  }

  return Promise.resolve('ok');
}

async function start() {
  await Promise.all(majorIds.map(eventId => getWinRates(eventId)));

  var eventDataText = fs.readFileSync("EventsData.json");
  var eventData = JSON.parse(eventDataText);

  fs.writeFileSync('EventWinRates.json', JSON.stringify(eventWinRates));
}

start();