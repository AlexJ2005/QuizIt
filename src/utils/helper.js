const words = [
  "frankrike",
  "brasilien",
  "spanien",
  "brad pitt",
  "portugal",
  "donald trump"
];

const shuffle = array => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const generateWord = () => {
  return Math.floor(Math.random() * words.length);
};

export const generateWords = rightAnswer => {
  let alternative1 = words[generateWord()];
  let alternative2 = words[generateWord()];

  while (alternative2 === alternative1) {
    alternative2 = words[generateWord()];
  }
  const alternatives = [alternative1, alternative2, rightAnswer];
  return shuffle(alternatives);
};
