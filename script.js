function OpeningCeremony(callbackFnc) {
    console.log("Let the games begin");
    setTimeout(() => {
      const score = { red: 0, blue: 0, green: 0, yellow: 0 };
      console.log("Score at Opening Ceremony: ", score);
      Race100M(score, callbackFnc);
    }, 1000);
  }
  
  function Race100M(score, callbackFnc) {
    console.log("Starting Race 100M");
    const timeTaken = {};
    const minTime = 10;
    const maxTime = 15;
    const colors = ["red", "blue", "green", "yellow"];
    colors.forEach((color) => {
      timeTaken[color] = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
    });
    const sortedColors = Object.keys(timeTaken).sort((a, b) => timeTaken[a] - timeTaken[b]);
    score[sortedColors[0]] += 50;
    score[sortedColors[1]] += 25;
    console.log("Score at Race 100M: ", score);
    callbackFnc(score, LongJump);
  }
  
  function LongJump(score, callbackFnc) {
    console.log("Starting Long Jump");
    const colors = ["red", "blue", "green", "yellow"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    const winnerColor = colors[randomIndex];
    score[winnerColor] += 150;
    console.log(`Winner of Long Jump: ${winnerColor}`);
    console.log("Score at Long Jump: ", score);
    callbackFnc(score, HighJump);
  }
  
  function HighJump(score) {
    console.log("Starting High Jump");
    const answer = prompt("What colour secured the highest jump?");
    let updatedScore = score;
    if (answer) {
      const color = answer.toLowerCase();
      if (color in score) {
        updatedScore[color] += 100;
      } else {
        console.log("Event was cancelled");
      }
    } else {
      console.log("Event was cancelled");
    }
    console.log("Score at High Jump: ", updatedScore);
    AwardCeremony(updatedScore);
  }
  
  function AwardCeremony(score) {
    console.log("Starting Award Ceremony");
    const sortedScores = Object.entries(score).sort(([, a], [, b]) => b - a);
    console.log(`${sortedScores[0][0]} came first with ${sortedScores[0][1]} points.`);
    console.log(`${sortedScores[1][0]} came second with ${sortedScores[1][1]} points.`);
    console.log(`${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`);
  }
  
  OpeningCeremony((score, callbackFnc) => {
    console.log("Starting Callback Hell");
    console.log("Score after Callback Hell: ", score);
    callbackFnc(score, (score, callbackFnc) => {
      console.log("Score after Callback Hell: ", score);
      callbackFnc(score, (score) => {
        console.log("Score after Callback Hell: ", score);
        HighJump(score);
      });
    });
  });
  