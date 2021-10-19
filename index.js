require("dotenv").config();
const inquirer = require("./ask");
const { addEmployeeQuestions, choose, updateManager } = require("./questions");
const mysql = require("mysql2");
const { Department, Employee, Job } = require("./constructors");
const { addJob, addEmployee } = require("./queries");
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
        const dept = new Department(employeeData.department);
        let deptId = await addDepartment(dept);
        const job = new Job(employeeData.job, employeeData.salary, deptId);
        let jobId = await addJob(job);
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
