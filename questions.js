const selectionChoices = [
  "View all Employees",
  "View all Employees By Department",
  "View all Employees By Manager",
  "Add Employee",
  "Remove Employee",
  "Remove Department",
  "Remove Role",
  "Update Employee Role",
  "Update Employee Manager",
  "View All Roles",
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
    name: "role",
    type: "input",
    message: "What role will the employee assume?",
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
    choices: getManagers,
  },
];
