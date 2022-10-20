const cTable = require("console.table");
const inquirer = require("inquirer");
const Mysql = require("mysql2");

require("dotenv").config();

const mysql = Mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

mysql.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected Succesfully");
    informationPrompt();
  }
});

const informationPrompt = () => {
  return inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Employees",
          "View All Roles",
          "Add Department",
          "Add Employee",
          "Add Role",
          "Update Employee Role",
        ],
      },
    ])
    .then(function (next) {
      switch (next.action) {
        case "View All Departments":
          viewDepartments();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateRole();
      }
    });
};

const viewDepartments = () => {
  const query = `SELECT * FROM departments`;
  mysql.query(query, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.table(res);
      informationPrompt();
    }
  });
};
const viewEmployees = () => {
  const query = `SELECT * FROM employees`;
  mysql.query(query, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.table(res);
      informationPrompt();
    }
  });
};
const viewRoles = () => {
  const query = `SELECT * FROM roles`;
  mysql.query(query, function (err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.table(res)
      informationPrompt();
    }
  });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What department would you like to create?",
      },
    ])
    .then((res) => {
      const query = `INSERT INTO departments SET ?`;
      mysql.query(query, {
        name: res.departmentName,
      });
      console.log(`Successfully added ${res.departmentName} to database`);
      informationPrompt();
    });
};
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's roleId?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the employee's manager id?",
      },
    ])
    .then((res) => {
      const query = `INSERT INTO employees SET ?`;
      mysql.query(query, {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId,
        manager_id: res.managerId,
      });
      console.log(
        `Successfully added ${res.firstName + " " + res.lastName} to database`
      );
      informationPrompt();
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentId",
        message: "which department does this role belong to?",
      },
      {
        type: "input",
        name: "roleName",
        message: "What is the name of this role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the role's salaray?",
      },
    ])
    .then((res) => {
      const query = `INSERT INTO roles SET ?`;
      mysql.query(query, {
        department_id: res.departmentId,
        title: res.roleName,
        salary: res.salary,
      });
      console.log(`Successfully added ${res.roleName} to database`
      );
      informationPrompt();
    });
};

const updateRole = () => {
  const employeeSql = `SELECT * FROM employees`;
  mysql.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({
      name: first_name + " " + last_name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "Which employee would you like to update?",
          choices: employees,
        },
      ])
      .then((res) => {
        const employee = res.name;
        const params = [];
        params.push(employee);

        const roleSql = `SELECT * FROM roles`;

        mysql.query(roleSql, (err, res) => {
          if (err) throw err;

          const roles = res.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((res) => {
              const role = res.roles;
              params.push(role);

              let employee = params[0];
              params[0] = role;
              params[1] = employee;

              const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
              mysql.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("Employees has been updated!");
                console.table(result);
                informationPrompt();
              });
            });
        });
      });
  });
};
