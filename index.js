// create variables to track scores for each team
let homeScore = 0;
let awayScore = 0;
// Create variables to track different types of scores for each team
let homeTriesSum = 0;
let awayTriesSum = 0;
let homeConversionSum = 0;
let awayConversionSum = 0;
// create variables for DOM reference elements
const homeBonusPoints = document.getElementById("homeBP");
const awayBonusPoints = document.getElementById("awayBP");
// create variables to operate Sin Bin Clock
let intervalClock;
let intervalSB;
//create variables to track number of red cards per team
let homeReds = 0;
let awayReds = 0;
// create variables for DOM reference elements.
const homeScoreDisplay = document.getElementById("home-score");
const awayScoreDisplay = document.getElementById("away-score");
const redCards = document.querySelectorAll(".RC");
const dropGoals = document.querySelectorAll(".DG");
const gameClock = document.getElementById("clock");
const homeRedCard = document.getElementById("homeRC");
const awayRedCard = document.getElementById("awayRC");
const start = document.getElementById("start");
const newGame = document.getElementById("newGame");


//function to add a try (5 points) to the relevant team.
document.querySelectorAll('.try').forEach(item => {
    item.addEventListener("click", function() {
        if (item.id == "home-try") {
            // add 5 points to the team score
            homeScore += 5;
            homeTriesSum++;
            if (homeTriesSum >= 4) {
                homeBonusPoints.textContent = "BP Earned";
            }
            homeScoreDisplay.textContent = homeScore;
        } else {
            awayScore += 5;
            awayTriesSum++;
            if (awayTriesSum >= 4) {
                awayBonusPoints.textContent = "BP Earned";
            }
            awayScoreDisplay.textContent = awayScore;
        }
    })
})


//function to add a drop goal (3 points) to a team
dropGoals.forEach(item => {
    item.addEventListener("click", function() {
        if (item.id === "home-DG") {
            homeScore += 3;
            homeScoreDisplay.textContent = homeScore;
        } else if (item.id === "away-DG") {
            awayScore += 3;
            awayScoreDisplay.textContent = awayScore;
        }
    })
})

//function to add a conversion upon a try being scored (2 points) to a team
document.querySelectorAll(".con").forEach(item => {
    item.addEventListener("click", function() {
        if ((homeTriesSum > 0) && (homeConversionSum < homeTriesSum)) {
            homeScore += 2;
            homeScoreDisplay.textContent = homeScore;
            homeConversionSum++;
        } 
        
        if ((awayTriesSum > 0) && (awayConversionSum < awayTriesSum)) {
            awayScore += 2;
            awayScoreDisplay.textContent = awayScore;
            awayConversionSum++;
        }
    })
})

//function to start, track and run the Sin Bin clock (10 minutes)
document.querySelectorAll(".SB").forEach(item => {
    item.addEventListener("click", function() {
        const tableRef = document.getElementById("sb-clocks");
        let newRow = tableRef.insertRow(-1);
        let teamCell = newRow.insertCell(0);
        let clockCell = newRow.insertCell(-1);

        if (item.id === "homeSB") {
            teamCell.textContent = "Home";
        } else {
            teamCell.textContent = "Away";
        }
        let minutes = 10;
        let seconds = 0;
        intervalSB = setInterval(function() {
            if ((minutes === 0) && (seconds === 0)) {
                finishClock(intervalSB);
                tableRef.deleteRow(1);
            } else if (seconds === 0) { 
                minutes--;
                seconds = 59; 
            } else { 
                seconds--; 
            };
            clockCell.textContent = minutes + " : " + seconds
        }, 
        1000);

    })
})

//function to reset the Sin Bin clock
function finishClock(intervalID) {
    return clearInterval(intervalID);
}

//function to start a new half (40 minutes)
start.addEventListener("click", function() {
    let minutes = 40;
    let seconds = 0;
    
    intervalClock = setInterval(function() {
        if ((minutes === 0) && (seconds === 0)) {
            finishClock(intervalClock);
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        };
        gameClock.textContent = minutes + ": " + seconds}, 1000)
})

// function to reset all game conditions
newGame.addEventListener("click", function() {
    awayScoreDisplay.textContent = 0;
    homeScoreDisplay.textContent = 0;
    homeTriesSum = 0;
    awayTriesSum = 0;
    homeConversionSum = 0;
    awayConversionSum = 0;
    homeBonusPoints.textContent = "Bonus Point";
    awayBonusPoints.textContent = "Bonus Point";
    homeScore = 0;
    awayScore = 0;
    finishClock(intervalClock);
    gameClock.textContent = 40 + ": " + 0;
    finishClock(intervalSB);
    homeRedCard.textContent = "Red Cards: ";
    homeReds = 0;
    awayReds = 0;
    awayRedCard.textContent = "Red Cards: ";
})

//function to track and show all Red Cards per team.
redCards.forEach(item => {
    item.addEventListener("click", function() {
        if (item.id == "homeRC") {
            homeReds++;
            homeRedCard.textContent = "Red Cards: " + homeReds;
        } else {
            awayReds++;
            awayRedCard.textContent = "Red Cards: " + awayReds;
        }
    })
})