require("dotenv").config();
const inquirer = require("./ask");
const {
  addEmployeeQuestions,
  choose,
  updateManager,
  updateJob,
  deleteJobQuestion,
  deleteDeptQuestion,
  removeEmployee,
} = require("./questions");
const mysql = require("mysql2");
const { Department, Employee, Job } = require("./constructors");
const {
  addJob,
  addEmployee,
  addDepartment,
  viewJob,
  viewEmployee,
  viewBudget,
  deleteJob,
  deleteEmployee,
  deleteDepartment,
  updateEmployeeJob,
  updateEmployeeManager,
} = require("./queries");
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  selectionFunc();
});

async function selectionFunc() {
  try {
    let { selection } = await inquirer(choose);
    switch (selection) {
      case "Exit":
        connection.end();
        console.log("Goodbye");
        process.exit();
      case "Add Employee":
        let employeeData = await inquirer(addEmployeeQuestions);
        console.log(employeeData);
        const department = new Department(employeeData.department);
        let deptId = await addDepartment(department);
        const job = new Job(employeeData.job, employeeData.salary, deptId);
        let jobId = await addJob(job);
        const employee = new Employee(
          employeeData.first_name,
          employeeData.last_name,
          jobId,
          employeeData.manager
        );
        await addEmployee(employee);
        console.log(employee);
        selectionFunc();
        break;
      case "Remove Job":
        let deleteJobAnswer = await inquirer(deleteJobQuestion);
        await deleteJob(deleteJobAnswer);
        selectionFunc();
        break;
      case "Remove Department":
        let deleteDept = await inquirer(deleteDeptQuestion);
        await deleteDepartment(deleteDept);
        selectionFunc();
        break;
      case "View Department Budget":
        await viewBudget();
        selectionFunc();
        break;
      case "View All Jobs":
        await viewJob();
        selectionFunc();
        break;
      case "Remove Employee":
        let erased = await inquirer(removeEmployee);
        await deleteEmployee(erased);
        selectionFunc();
        break;
      case "View all Employees":
        await viewEmployee();
        selectionFunc();
        break;
      case "View all Employees By Department":
        await viewEmployee(true);
        selectionFunc();
        break;
      case "View all Employees By Manager":
        await viewEmployee("", true);
        selectionFunc();
        break;
      case "Update Employee Job":
        let updatedJob = await inquirer(updateJob);
        await updateEmployeeJob(updatedJob);
        selectionFunc();
        break;
      case "Update Employee Manager":
        let updatedManager = await inquirer(updateManager);
        await updateEmployeeManager(updatedManager);
        selectionFunc();
        break;
    }
  } catch (error) {
    console.error(error);
  }
}
module.exports = { selectionFunc: selectionFunc };
