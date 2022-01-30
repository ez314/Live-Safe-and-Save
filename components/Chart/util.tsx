export const convertToTimeSeries = (scoresArr: any) => {
    let res = [];
    let timestamp = 0;
    let recScore = [22,24,25,28,32,32,35,36]
  
    scoresArr && scoresArr.forEach(score => {
      res.push({
        timestamp,
        score,
        "recScore": recScore[timestamp]
      });
  
      timestamp += 1;
    });
  
    return res;
  }

//   export const convertToTimeSeries = (scoresArr: any) => {
//     let res = [];
//     let timestamp = new Date();
//     let numScores = scoresArr.length;
  
//     timestamp.setFullYear(2016, 8, 24);

//     let totalTime = new Date().getTime() - timestamp.getTime();
//     let timeChange = totalTime / numScores;
//     console.log(numScores, totalTime, timeChange)
  
//     scoresArr && scoresArr.forEach(score => {
//       res.push({
//         timestamp,
//         score
//       });
  
//       timestamp = new Date(timestamp.getTime() + timeChange);
//     });
  
//     return res;
//   }