const inquirer = require("inquirer");
const questions = require("./questions");
function ask(questions) {
  console.log(questions);
  return new Promise(function (resolve, reject) {
    inquirer
      .prompt(questions)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
module.exports = ask;
