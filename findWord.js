const readline = require("readline");
const { readFile, createReadStream } = require("fs");

const filename = __dirname + "/words.txt";

/**
 * two functions are made and only one is exported
 * they are the same in defferent ways
 */

const readWords = (callback) => {
  readFile(filename, "utf-8", (err, data) => {
    // reading file
    if (err) {
      callback(err, undefined); // callback returned with error
    } else {
      const words = data.split("\r\n"); // make an array of words
      //   console.log(words);
      callback(null, words); // callback returned with array of words
    }
  });
};

const getWords = () => {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: createReadStream(filename), //create read stream
    });
    const words = []; //an array to fill with words
    readInterface.on("line", (word) => {
      //on reading line event
      try {
        words.push(word); //add word to array of words
      } catch (e) {
        return reject(e);
      }
    });

    readInterface.on("close", () => {
      //on finishing reading stream
      try {
        // console.log(words);
        resolve(words); //resolve promise with array of words
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = getWords;

//test
// readWords((err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// getWords()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("error occure");
//   });
