/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.t = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
   static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }
   
  makeChains() {
    // TODO
    let o = {};
    let val = [];

    for (let i = 0; i < this.words.length; i++){
      o[`${this.words[i]}`] = [];
    }

    // console.log(Object.keys(o).length)
    for (let i = 0; i < Object.keys(o).length; i++){
      val.push([]);
    }
    // console.log('val is', val)
    
    for (let i = 0; i < this.words.length; i++){
      for (let j = 0; j < Object.keys(o).length; j++){

        if(i == this.words.length - 1 && this.words[i] == `${Object.keys(o)[j]}`){  
         val[j].push(null)
         o[`${this.words[i]}`] = val[j];
         break;
        }
        else if(this.words[i] == `${Object.keys(o)[j]}`){
          val[j].push(this.words[i+1])
          o[`${this.words[i]}`] = val[j];
          break;
        }
      }
    }
    this.o = o;
  }


  /** return random text from chains */
  // items[Math.floor(Math.random()*items.length)]

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(Object.keys(this.o));
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.o[`${key}`]);
    }

    return out.join(" ");
  }
  
}

module.exports = {
  MarkovMachine : MarkovMachine,
  makeChains : this.makeChains,
  makeText : this.makeText,
}