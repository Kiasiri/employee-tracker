const inquirer = require("inquirer");

function inquirerAsk(questions) {
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
module.exports = inquirerAsk;
