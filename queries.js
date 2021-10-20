const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
//Beggining of job funcions
function addJob(job) {
  const sql = "INSERT INTO job SET ?";
  connection.query(
    sql,
    {
      title: job.title,
      salary: job.salary,
      department_id: job.department_id,
    },
    (err, res) => {
      if (err) throw err;
    }
  );
  return new Promise(function (resolve, reject) {
    const sql = "SELECT * FROM job WHERE ? AND ? AND ?";
    connection.query(
      sql,
      [
        { title: job.title },
        { salary: job.salary },
        { department_id: job.department_id },
      ],
      (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res[0].id);
      }
    );
  });
}

function deleteJob(remove) {
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM job WHERE ?";
    connection.query(sql, { id: remove.job }, (err, res) => {
      if (err) {
        return reject(
          "Please remove  all employees from this job before deleting"
        );
      }
      resolve(console.log(`Job removed`));
    });
  });
}

function viewJob() {
  return new Promise(function (resolve, reject) {
    const sql = "SELECT DISTINCT(title) FROM employee_tracker.job;";
    connection.query(sql, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(console.table(res));
    });
  });
}

function getJob() {
  return new Promise(function (resolve, reject) {
    const selectJob =
      "SELECT DISTINCT(title), job.id  FROM job GROUP BY title;";
    connection.query(selectJob, (err, res) => {
      const jobChoices = [];
      res.forEach((job) => {
        let obj = {};
        Object.assign(obj, {
          name: `${job.title}`,
        });
        Object.assign(obj, { value: `${job.id}` });
        jobChoices.push(...[obj]);
      });
      resolve(jobChoices);
    });
  });
}
//End of job functions
//Beggining of employee functions
function addEmployee(employee) {
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO employee SET ?";
    connection.query(
      sql,
      {
        first_name: employee.first_name,
        last_name: employee.last_name,
        job_id: employee.job_id,
        manager_id: employee.manager,
      },
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(console.log(`New employee added`));
      }
    );
  });
}

function getEmployees() {
  return new Promise(function (resolve, reject) {
    const selectEmployee =
      "SELECT employee.first_name, employee.last_name, employee.id FROM employee";
    connection.query(selectEmployee, (err, res) => {
      if (err) throw err;
      const employeeChoices = [];
      res.forEach((employee) => {
        let obj = {};
        Object.assign(obj, {
          name: `${employee.first_name} ${employee.last_name}`,
        });
        Object.assign(obj, { value: `${employee.id}` });
        employeeChoices.push(...[obj]);
      });
      resolve(employeeChoices);
    });
  });
}
function deleteEmployee(employee) {
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM employee WHERE ?";
    connection.query(sql, { id: employee.remove }, (err, res) => {
      if (err) {
        return reject(
          "Please remove all employees from this manager before deleting"
        );
      }
      resolve(console.log(`Removed employee from database`));
    });
  });
}
//End of Employee functions

function getManagers() {
  return new Promise(function (resolve, reject) {
    const selectManager =
      "SELECT employee.first_name, employee.last_name, employee.id FROM employee LEFT JOIN job ON employee.job_id = job.id WHERE job.title = 'Manager'";
    connection.query(selectManager, (err, res) => {
      const managerChoices = [{ name: "None", value: null }];
      res.forEach((manager) => {
        let obj = {};
        Object.assign(obj, {
          name: `${manager.first_name} ${manager.last_name}`,
        });
        Object.assign(obj, { value: `${manager.id}` });
        managerChoices.push(...[obj]);
      });
      resolve(managerChoices);
    });
  });
}

//TODO: make functions that add jobs and departments
//TODO: make functions that update job department and employees
//TODO: make functions that delete employee jobs and departments
//TODO make function to get list of managers
module.exports = {
  addEmployee: addEmployee,
  addJob: addJob,
  getJob: getJob,
  deleteJob: deleteJob,
  viewJob: viewJob,

  //addDepartment: addDepartment,
  getManagers: getManagers,
  getEmployees: getEmployees,
};
