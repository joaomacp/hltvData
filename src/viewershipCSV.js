const fs = require('fs');

var eventDataText = fs.readFileSync("EventsDataFixedMapsAndCountriesWithViewership.json");
var eventData = JSON.parse(eventDataText);

var result = "time,viewers\n";

for(const event of eventData) {
  result += (event.date.substr(0, 10) + ',' + event.viewership + '\n');
}

fs.writeFileSync('viewership.csv', result);