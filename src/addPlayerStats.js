const { HLTV } = require('hltv');
const fs = require('fs');
const EVENTS = [ 1270, 1333, 1444, 1553, 1611, 1666, 1617, 2027, 2062, 2471, 2720, 3247, 3564, 3883, 4443 ];

eventStats = {};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {
  for(const eventId of EVENTS) {
    HLTV.getEvent({id: eventId}).then(res => {
      eventStats[eventId] = res.playerStats.sort((a, b) => Number(b.rating) - Number(a.rating));

      for(stat of eventStats[eventId]) {
        stat.id = stat.id.split('/')[3];    

        stat.country = stat.country.substr(stat.country.length - 6, 2);
      }

      console.log(JSON.stringify(eventStats));
    });

    await sleep(500);
  }

  await sleep(2000);

  var eventDataText = fs.readFileSync("bimbum.json");
  var eventData = JSON.parse(eventDataText);

  for(eventId of Object.keys(eventStats)) {
    for(event of eventData) {
      if(event.id == eventId) {
        event.playerStats = eventStats[eventId];
      }
    }
  }

  fs.writeFileSync("bimbum.json", JSON.stringify(eventData));
}

start();