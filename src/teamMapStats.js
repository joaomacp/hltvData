const { HLTV } = require('hltv');
const fs = require('fs');

const majorIds = [1270, 1333, 1444, 1553, 1611, 1666, 1617, 2027, 2062, 2471, 2720, 3247, 3564, 3883, 4443];

var teamMapStats = [];

var eventDataText = fs.readFileSync("EventsDataFixedMapsAndCountriesWithViewership.json");
var eventData = JSON.parse(eventDataText);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTeamMapStats(eventId) {
  for(const event of eventData) {
    if(event.id == eventId) {
      for(const prizeDist of event.prizeDistribution) {
        console.log('event: ', eventId)
        console.log('team: ', prizeDist.team.id)
        teamMapStat = await getTeamMapStat(eventId, prizeDist.team.id);
        console.log(JSON.stringify(teamMapStat));

        for(const mapStat of teamMapStat.maps) {
          teamMapStats.push({
            eventId: eventId,
            teamId: prizeDist.team.id,
            map: mapStat.name,
            timesPlayed: mapStat.timesPlayed,
            ctRoundsWon: mapStat.ctRoundsWon,
            tRoundsWon: mapStat.tRoundsWon
          });
        }
      }
    }
  }

  return Promise.resolve('ok');
}

async function getTeamMapStat(eventId, teamId) {
  teamMapStat = await HLTV.getTeamMapStats({eventId, teamId});
  await sleep(1000);

  return teamMapStat;
}

async function start() {
  //await Promise.all(majorIds.map(eventId => getTeamMapStats(eventId)));

  for(const eventId of majorIds) {
    await getTeamMapStats(eventId);
  }

  fs.writeFileSync('TeamMapStats.json', JSON.stringify(teamMapStats));
}

start();