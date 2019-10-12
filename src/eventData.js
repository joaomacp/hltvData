const { HLTV } = require('hltv');
const fs = require('fs');
const EVENTS = [ 1270, 1333, 1444, 1553, 1611, 1666, 1617, 2027, 2062, 2471, 2720, 3247, 3564, 3883, 4443 ];

var events = [];

function jsonify(ctnt, filename) {
	var jsonContent = JSON.stringify(ctnt);

	fs.writeFile(filename + '.json', jsonContent, 'utf8', function (err) {
		if (err) {
			console.log('An error occured while writing JSON Object to File.');
			return console.log(err);
		}
	});
}

for(const eventId of EVENTS) {
  HLTV.getEvent({id: eventId}).then(res => {
    var event = {};

    event.id = res.id;
    event.name = res.name;
    event.date = new Date(res.dateEnd);
    event.prizePool = Number(res.prizePool.substr(1).replace(/,/g, ''));
    event.maps = res.mapPool;

    event.teams = [];
    for(const team of res.teams) {
      event.teams.push(team.name);
    }

    event.prizeDistribution = res.prizeDistribution;

    event.playerStats = res.playerStats;

    for(const stat of event.playerStats) {
      if(stat.id) {
        stat.id = stat.id.split('/')[3];
      }
      
      if(stat.country) {
        stat.country = stat.country.substr(stat.country.length - 6, 2);
      }

      // If this is not printed, then we are being rate-limited by HLTV.
      console.log('Player stat: ' + stat);
    }

    events.push(event);

    jsonify(events,"EventsData");
  });
}