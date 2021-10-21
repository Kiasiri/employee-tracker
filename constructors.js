function Employee(first_name, last_name, job, manager_id) {
  this.first_name = first_name;
  this.last_name = last_name;
  this.job_id = job;
  this.manager_id = manager_id;
}

function Department(title) {
  this.title = title;
}

function Job(title, salary, department_id) {
  this.title = title;
  this.salary = salary;
  this.department_id = department_id;
}

module.exports = {
  Employee: Employee,
  Department: Department,
  Job: Job,
};
