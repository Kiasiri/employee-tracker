require("dotenv").config();
const inquirer = require("./ask");
const PORT = process.env.PORT || 3001;
const { addEmployeeQuestions, choose } = require("./questions");
const mysql = require("mysql2");
const { Department, Employee, Role, Job } = require("./constructors");
const { addJob, addEmployee } = require("./queries");
const connection = mysql.createConnection({
  host: "localhost",
  port: PORT,
  user: process.env.user,
  password: process.env.password,
  database: process.env.DB,
});
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  selectionFunc();
});

async function selectionFunc() {
  try {
    let { selection } = await inquirer(employeeAction);
    switch (selection) {
      case "Exit":
        connection.end();
        console.log("Goodbye");
        process.exit();
      case "Add Employee":
        let employeeData = await inquirer(addEmployeeQuestions);
        const dept = new Department(employeeData.department);
        let deptId = await addDepartment(dept);
        const job = new Job(employeeData.job, employeeData.salary, deptId);
        let jobId = await addRole(job);
        const employee = new Employee(
          employeeData.fname,
          employeeData.lname,
          jobId,
          employeeData.manager
        );
        await addEmployee(employee);
        selectionFunc();
        break;
    }
  } catch (error) {
    console.error(error);
  }
}
