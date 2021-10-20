const {
  getManagers,
  getEmployees,
  getJob,
  getDepartment,
} = require("./queries");

const selectionChoices = [
  "View all Employees",
  "View all Employees By Department",
  "View all Employees By Manager",
  "Add Employee",
  "Remove Employee",
  "Remove Department",
  "Remove Job",
  "Update Employee Job",
  "Update Employee Manager",
  "View All Jobs",
  "View Department Budget",
  "Exit",
];

const choose = [
  {
    name: "selection",
    type: "list",
    message: "What would you like to do?",
    choices: selectionChoices,
  },
];

const addEmployeeQuestions = [
  {
    name: "fname",
    type: "input",
    message: "What is the employee's first name?",
  },
  {
    name: "lname",
    type: "input",
    message: "What is the employee's last name?",
  },
  {
    name: "department",
    type: "input",
    message: "What is the employee's department?",
  },
  {
    name: "job",
    type: "input",
    message: "What job will the employee assume?",
  },
  {
    name: "salary",
    type: "input",
    message: "What is the employee's salary?",
  },
  {
    name: "manager",
    type: "list",
    message: "Who is the employee's manager?",
    choices: getEmployees,
  },
];
const updateManager = [
  {
    name: "name",
    type: "list",
    message: "Which employee would you like to update?",
    choices: getEmployees,
  },
  {
    name: "updateManager",
    type: "list",
    message: "Whos is their new manager?",
    choices: getManagers,
  },
];

const updateJob = [
  {
    name: "name",
    type: "list",
    message: "Which employee would you like to update?",
    choices: getEmployees,
  },
  {
    name: "updateJob",
    type: "list",
    message: "Which new job will the employee now assume?",
    choices: getJob,
  },
];

const removeEmployee = [
  {
    name: "remove",
    type: "list",
    message: "Which employee would you like to remove?",
    choices: getEmployees,
  },
];

const deleteJobQuestion = [
  {
    name: "job",
    message: "Which job would you like to remove?",
    type: "list",
    choices: getJob,
  },
];

const deleteDeptQuestion = [
  {
    name: "dept",
    message: "Which department would you like to remove?",
    type: "list",
    choices: getDepartment,
  },
];
module.exports = {
  addEmployeeQuestions: addEmployeeQuestions,
  choose: choose,
  updateManager: updateManager,
  updateJob: updateJob,
  removeEmployee: removeEmployee,
  deleteJobQuestion: deleteJobQuestion,
  deleteDeptQuestion: deleteDeptQuestion,
};
