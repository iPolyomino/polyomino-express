const express = require("express");
const app = express();
const port = 8080;
const profile = require("./profile.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.json(profile);
});

app.post("/hit-and-blow/:digits", (req, res) => {
  const questions = req.body.questions;
  const digits = parseInt(req.params.digits);

  const permutations = (nums) => {
    const result = [];
    const permute = (queue = []) => {
      if (queue.length === digits) {
        result.push(queue);
      } else {
        for (let num of nums) {
          if (!queue.includes(num)) {
            permute(queue.concat(num));
          }
        }
      }
    };
    permute();
    return result;
  };

  const hitCounter = (a, b) => {
    ans = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        ans++;
      }
    }
    return ans;
  };

  const blowCounter = (a, b) => {
    ans = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (i === j) continue;
        if (a[i] === b[j]) {
          ans++;
        }
      }
    }
    return ans;
  };

  let answer = permutations([...Array(10).keys()]);
  for (let question of questions) {
    const challenge = (cNum, { hit, blow }) => {
      return answer
        .filter((ans) => hitCounter(ans, cNum) === hit)
        .filter((ans) => blowCounter(ans, cNum) === blow);
    };
    answer = challenge(
      question.number.split("").map((e) => parseInt(e)),
      question.result
    );
  }

  res.json(answer.map((e) => e.join("")));
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
