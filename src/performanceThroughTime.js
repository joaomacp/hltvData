const fs = require('fs');

var eventDataText = fs.readFileSync("EventsDataFixedMapsAndCountriesWithViewership.json");
var eventData = JSON.parse(eventDataText);

var teamSums = {};
var prizeMoneySum = [];
var scoreSystemSum = [];

for(const event of eventData) {
  totalPrize = event.prizePool;

  for(const dist of event.prizeDistribution) {
    teamName = dist.team.name;
    teamPrize = Number(dist.prize.substr(1).replace(/,/g, ''));

    if(teamSums[teamName]) {
      teamSums[teamName].prizeMoney += teamPrize;
      teamSums[teamName].scoreSystem += teamPrize / totalPrize * 100;
    }
    else {
      teamSums[teamName] = {
        prizeMoney: teamPrize,
        scoreSystem: teamPrize / totalPrize * 100
      }
    }
  }

  currEventPrizeMoneySum = [];
  currEventScoreSystemSum = [];

  for(const teamName of Object.keys(teamSums)) {
    currEventPrizeMoneySum.push({
      date: event.date,
      team: teamName,
      totalMoney: teamSums[teamName].prizeMoney
    });

    currEventScoreSystemSum.push({
      date: event.date,
      team: teamName,
      totalPoints: teamSums[teamName].scoreSystem.toFixed(2)
    });
  }

  currEventPrizeMoneySum.sort((a, b) => (b.totalMoney - a.totalMoney));
  currEventScoreSystemSum.sort((a, b) => (b.totalPoints - a.totalPoints));

  var counter = 1;
  for(const currEvent of currEventPrizeMoneySum) {
    currEvent.place = counter++;
  }

  var counter = 1;
  for(const currEvent of currEventScoreSystemSum) {
    currEvent.place = counter++;
  }

  prizeMoneySum.push(...currEventPrizeMoneySum);
  scoreSystemSum.push(...currEventScoreSystemSum);
}

fs.writeFileSync('prizeMoneySum.json', JSON.stringify(prizeMoneySum));
fs.writeFileSync('scoreSystemSum.json', JSON.stringify(scoreSystemSum));