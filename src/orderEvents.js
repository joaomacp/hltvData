const fs = require('fs');

const EVENTS = [ 1270, 1333, 1444, 1553, 1611, 1666, 1617, 2027, 2062, 2471, 2720, 3247, 3564, 3883, 4443 ];

var eventDataText = fs.readFileSync("EventsDataFixedMapsAndCountriesWithViewership.json");
var eventData = JSON.parse(eventDataText);

var result = [];

for(const eventId of EVENTS) {
  for(const currEvent of eventData) {
    if(currEvent.id == eventId) {
      result.push(currEvent);
    }
  }
}

fs.writeFileSync('EventsDataFixedMapsAndCountriesWithViewership_Ordered.json', JSON.stringify(result));