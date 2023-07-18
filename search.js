const getWords = require("./findWord"); //get all words

const search = (input) => {
  return new Promise((resolve, reject) => {
    getWords()
      .then(async (words) => {
        try {
          //read all words in the retuned array
          const result = await words.filter(
            (word) => word.toLowerCase().startsWith(input.toLowerCase()) //check words that starts with input
          );
          resolve(result);
        } catch (err) {
          reject(err);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = search;

//test
// search("a").then((data) => {
//   console.log(data);
// });
