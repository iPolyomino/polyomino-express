const express = require("express");
const app = express();
const port = 8080;
const profile = require("./profile.json");

app.use(express.json());

app.get("/", (req, res) => {
  res.json(profile);
});

const hitblow = [
  { hit: 0, blow: 0 },
  { hit: 0, blow: 1 },
  { hit: 0, blow: 2 },
  { hit: 0, blow: 3 },
  { hit: 1, blow: 0 },
  { hit: 1, blow: 1 },
  { hit: 1, blow: 2 },
  { hit: 2, blow: 0 },
  { hit: 2, blow: 1 },
  { hit: 3, blow: 0 },
];

const Permutations = (nums) => {
  const result = [];
  const permute = (queue = []) => {
    if (queue.length === 3) {
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

const HitCounter = (a, b) => {
  ans = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      ans++;
    }
  }
  return ans;
};

const BlowCounter = (a, b) => {
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

const Answer = Permutations([...Array(10).keys()]);

app.post("/hit-and-blow", (req, res) => {
  const questions = req.body.questions;

  let answer = Answer;
  for (let question of questions) {
    const challenge = (cNum, { hit, blow }) => {
      return answer
        .filter((ans) => HitCounter(ans, cNum) === hit)
        .filter((ans) => BlowCounter(ans, cNum) === blow);
    };
    answer = challenge(
      question.number.split("").map((e) => parseInt(e)),
      question.result
    );
  }

  res.json(answer.map((e) => e.join("")));
});

app.post("/hit-and-blow/next", (req, res) => {
  const questions = req.body.questions;
  const next = req.body.next.split("").map((e) => parseInt(e));

  let answer = Answer;
  for (let question of questions) {
    const challenge = (cNum, { hit, blow }) => {
      return answer
        .filter((ans) => HitCounter(ans, cNum) === hit)
        .filter((ans) => BlowCounter(ans, cNum) === blow);
    };
    answer = challenge(
      question.number.split("").map((e) => parseInt(e)),
      question.result
    );
  }

  let result = {};
  for (let hb of hitblow) {
    let hbResult = answer
      .filter((hbr) => HitCounter(hbr, next) === hb.hit)
      .filter((hbr) => BlowCounter(hbr, next) === hb.blow);
    result[`${hb.hit}hit${hb.blow}blow`] = hbResult.length;
  }

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});
