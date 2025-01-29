const URL = "https://dodgelol.gg/api/summoner/";

let summonerName = "";

async function searchSummoner() {
  summonerName = document.getElementById("search").value;
  data();
}

async function data() {
  let [gameName, tagLine] = summonerName.split("#");
  let summonerNameURL = `${gameName}/${tagLine}`;
  let fullURL = URL + summonerNameURL;

  const summonerData = await fetch(fullURL);
  const fullSummonerData = await summonerData.json();

  // Summoner's Name
  document.getElementById("summonerName").innerText =
    "Summoner's name: " + gameName;

  // Summoner's level
  let summonersLevel = fullSummonerData.summonerData.summonerLevel;
  console.log(summonersLevel);
  document.getElementById("summonerLevelData").innerText =
    gameName + "'s level is: " + summonersLevel;

  // Summoner's profile pic
  let getProfilePic = fullSummonerData.summonerData.profileIconId;
  let profilePic = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${getProfilePic}.png`;
  document.getElementById("summonerIconId").src = profilePic;

  // Summoner's solo rank
  if (
    fullSummonerData.summonerRankedData &&
    fullSummonerData.summonerRankedData.length > 0
  ) {
    let rankData = fullSummonerData.summonerRankedData[0];
    if (rankData && rankData.tier) {
      let rank = rankData.tier;
      let rankNumber = rankData.rank;
      console.log("Rank data:", rank);
      document.getElementById("summonerRank").innerText =
        gameName + "'s rank is: " + rank + " " + rankNumber;
    } else {
      console.log("Rank data not available.");
      document.getElementById("summonerRank").innerText =
        "Rank data is not available for " + gameName;
    }
  } else {
    console.log("No ranked data available.");
    document.getElementById("summonerRank").innerText =
      "No ranked data available for " + gameName;
  }

  // Summoner's wins + losses
  let getWins = fullSummonerData.summonerRankedData[0].wins;
  let getLoss = fullSummonerData.summonerRankedData[0].losses;
  document.getElementById("summonerWin").innerText =
    gameName + " has won: " + getWins + " games";
  document.getElementById("summonerLoss").innerText =
    gameName + " has lost: " + getLoss + " games";
}
