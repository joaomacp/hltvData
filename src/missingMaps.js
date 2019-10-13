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

const noMapEvents = [1270, 1333, 2027, 1553, 1444, 1611, 1666, 1617];

var eventMaps = {};

async function getEventMaps(eventId) {
  maps = await HLTV.getEventMaps({id: eventId});

  console.log(eventId + ' - ' + JSON.stringify(maps));

  maps = maps.maps.map((mapObject) => mapCodes[mapObject.name])

  eventMaps[eventId] = maps

  return Promise.resolve('ok');
}

async function start() {
  var maps = await Promise.all(noMapEvents.map(eventId => getEventMaps(eventId)));

  console.log(eventMaps);

  // Replace in EventsData
  var eventDataText = fs.readFileSync("EventsData.json");
  var eventData = JSON.parse(eventDataText);

  for(const event of eventData) {
    if(noMapEvents.includes(event.id)) {
      event.maps = eventMaps[event.id];
    }
  }

  fs.writeFileSync('EventsDataFixedMaps.json', JSON.stringify(eventData));
}

start();