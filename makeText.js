const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov.js');

// gather data from command line arguments
const type = process.argv[2];
const path = process.argv[3];

// controller function
async function generateText(type, path) {
  const origText = await gatherOrigText(type, path);
  const mm = new MarkovMachine(origText);
  console.log(mm.makeText());
}

async function gatherOrigText(type, path) {
  try {
    if (type === 'file') {
      const resp = await fs.promises.readFile(path);
      return resp.toString();
    } else if (type === 'url') {
      const resp = await axios.get(path);
      return resp.data;
    }
  } catch (err) {
    console.log(`Error fetching ${path}:`);
    console.log(`${err}`);
    process.exit(1);
  }
}

// on start:
generateText(type, path);