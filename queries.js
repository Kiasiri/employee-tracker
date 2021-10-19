const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT,
  user: process.env.user,
  password: process.env.password,
  database: process.env.DB,
});

function addEmployee(employee) {
  return new Promise(function (resolve, reject) {
    const sql = "INSERT INTO employee SET ?";
    connection.query(
      sql,
      {
        first_name: employee.first_name,
        last_name: employee.last_name,
        role_id: employee.role_id,
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

module.exports = { addEmployee: addEmployee };
