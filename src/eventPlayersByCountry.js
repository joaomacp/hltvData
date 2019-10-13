const fs = require('fs');

var eventDataText = fs.readFileSync("EventsDataFixedMaps.json");
var eventData = JSON.parse(eventDataText);

for(const event of eventData) {
  event.playersByCountry = {};

  for(const playerStat of event.playerStats) {
    if(event.playersByCountry[playerStat.country]) {
      event.playersByCountry[playerStat.country]++;
    }
    else {
      event.playersByCountry[playerStat.country] = 1;
    }
  }
}

fs.writeFileSync('EventsDataFixedMapsAndCountries.json', JSON.stringify(eventData));