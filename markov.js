/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.toLowerCase().split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordsNoDuplicates = this.removeDuplicates();
    this.chains = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chainsObj = {};
    for (const word of this.wordsNoDuplicates) {
      chainsObj[word] = [];
      for (let i = 0; i < this.words.length; i++) {
        if (word === this.words[i]) {
          const followingWord = this.words[i + 1];
          if (followingWord) {
            chainsObj[word].push(followingWord);
          } else {
            chainsObj[word].push(null);
          }
        }
      }
    }
    return chainsObj;
  }

  removeDuplicates() {
    return this.words.filter((word, index, array) => array.indexOf(word) === index);
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // Choose a random first word
    let currentWord = this.wordsNoDuplicates[Math.floor(Math.random() * this.wordsNoDuplicates.length)];
    const textArray = [currentWord];
    while (currentWord && textArray.length < numWords) {
      const followingWordArray = this.chains[currentWord];
      currentWord = followingWordArray[Math.floor(Math.random() * followingWordArray.length)];
      if (currentWord) {
        textArray.push(currentWord);
      }
    }
    return textArray.join(' ');
  }
}

module.exports = MarkovMachine