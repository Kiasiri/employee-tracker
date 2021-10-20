const mysql = require("mysql2");
const { selectionFunc } = require("./index");
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
    const sql = "SELECT DISTINCT(title) FROM employee_db.job;";
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
//update employee job

function updateEmployeeJob(employee) {
  return new Promise(function (resolve, reject) {
    const employeeJobId = [
      { title: employee.updateJob },
      { id: employee.name },
    ];
    const sql = "UPDATE job SET ? WHERE ?";
    connection.query(sql, employeeJobId, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(console.log(`Employee's job changed`));
    });
  });
}

//Beggining of employee functions
function addEmployee(employee) {
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO employee Values ()  ";
    connection.query(sql, employee, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(console.log(`New employee added`));
    });
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
//working
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

function updateEmployeeManager(employee) {
  return new Promise(function (resolve, reject) {
    const updateArr = [
      { manager_id: employee.updateManager },
      { id: employee.name },
    ];
    const sql = "UPDATE employee SET ? WHERE ?";
    connection.query(sql, updateArr, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(console.log(`Employee's manager updated!`));
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
function getDepartment() {
  return new Promise(function (resolve, reject) {
    const selectDepartment =
      "SELECT department.title, department.id FROM department";
    connection.query(selectDepartment, (err, res) => {
      if (err) throw err;
      const departmentChoices = [];
      res.forEach((department) => {
        let obj = {};
        Object.assign(obj, {
          name: `${department.title}`,
        });
        Object.assign(obj, { value: `${department.id}` });
        departmentChoices.push(...[obj]);
      });
      resolve(departmentChoices);
    });
  });
}

function deleteDepartment(remove) {
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM department WHERE ?";
    connection.query(sql, { id: remove.department }, (err, res) => {
      if (err) {
        return reject(
          "Please remove all employees from this department before deleting"
        );
      }
      resolve(console.log(`Department removed`));
    });
  });
}

function viewBudget() {
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT department.title as 'Department', Sum(job.salary) AS Budget FROM department RIGHT JOIN job on job.department_id = department.id GROUP BY department.title;";
    connection.query(sql, (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(console.table(res));
    });
  });
}

function viewEmployee(byDepartment, byManager) {
  return new Promise(function (resolve, reject) {
    if (byDepartment === true) {
      const queryDepartment =
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', department.title AS 'Department' FROM employee LEFT JOIN job ON employee.job_id = job.id LEFT JOIN department ON job.department_id = department.id ORDER BY Department, employee.last_name;";
      connection.query(queryDepartment, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(console.table(res));
      });
    } else if (byManager === true) {
      const queryManager =
        "SELECT CONCAT(employee1.first_name, ' ', employee1.last_name) AS 'Employee Name', CONCAT(employee.first_name, ' ', employee.last_name) AS 'Manager' FROM employee as employee1 INNER JOIN employee ON employee1.manager_id = employee.id ORDER BY Manager, employee.last_name;";
      connection.query(queryManager, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(console.table(res));
      });
    } else {
      const queryAll =
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS 'Employee Name', department.title AS 'Department', job.title AS 'Title', job.salary AS 'Salary', CONCAT(employee1.first_name, ' ', employee1.last_name) AS 'Manager' FROM employee LEFT JOIN employee AS employee1 ON employee.manager_id = employee1.id LEFT JOIN job ON employee.job_id = job.id LEFT JOIN department ON job.department_id = department.id ORDER BY employee.last_name;";
      connection.query(queryAll, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(console.table(res));
      });
    }
  });
}

function addDepartment(department) {
  return new Promise(function (resolve, reject) {
    redo();
    function redo() {
      const selectDept = "SELECT * FROM department where title = ?";
      connection.query(selectDept, [department.title], function (err, res) {
        if (err) {
          return reject(err);
        }
        console.log("found nothing");
        const valueArray = [];
        res.forEach((i) => {
          valueArray.push(...Object.values(i));
        });
        if (valueArray.indexOf(1) !== -1) {
          const getId = "SELECT id FROM department WHERE ?";
          connection.query(getId, [department.title], (err, res) => {
            if (err) {
              return reject(err);
            }
            resolve(res[0].id);
          });
        } else {
          console.log(
            `${department.title} department not found in database, creating new department`
          );
          const insertDept = "INSERT INTO department (title) VALUES (?)";
          connection.query(insertDept, [department.title], function (err, res) {
            if (err) {
              return reject(err);
            }
            console.log(`Department created!`);
            console.log(res);
          });
        }
        //selectionFunc();
      });
    }
  });
}

//TODO: make function that add departments
//TODO: make functions that update department and employees
//TODO: make functions that delete departments
//Using export list as a pseudo checklist
module.exports = {
  addEmployee: addEmployee,
  addJob: addJob,
  getJob: getJob,
  deleteJob: deleteJob,
  viewJob: viewJob,
  deleteEmployee: deleteEmployee,
  addDepartment: addDepartment,
  getManagers: getManagers,
  getEmployees: getEmployees,
  updateEmployeeManager: updateEmployeeManager,
  getDepartment: getDepartment,
  deleteDepartment: deleteDepartment,
  updateEmployeeJob: updateEmployeeJob,
  viewEmployee: viewEmployee,
  viewBudget: viewBudget,
};
