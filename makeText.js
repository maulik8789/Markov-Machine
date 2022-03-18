/** Command-line tool to generate Markov text. */
let markov = require('./markov');
let process = require('process');
let axios = require('axios');
let fs = require('fs');



let path;
// let out;


function getOut(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

/** read file at path and print it out. */

function makeFileText(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      getOut(data);
    }
  });
}


async function makeURLText(url) {
  try {
    let htmlVer = await axios.get(url);
    getOut(htmlVer.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(2);
  }
}


if (process.argv[2] === 'file') {
  makeFileText(process.argv[3]);
} 
else if (process.argv[2] === 'url'){
  makeURLText(process.argv[3]);
}
else{
    console.log("Error!")
    process.exit(3);
}



