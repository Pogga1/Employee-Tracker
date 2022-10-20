const inquirer = import('inquirer');
const Mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const mysql = Mysql.createConnection({
   host: 'localhost',
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

mysql.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log('Connected Succesfully');
        employeePrompt();
    }
});

const employeePrompt = () => { 
    return inquirer.prompt([{
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View All Departments", "View All Employees", "View All Roles", "Add Department", "Add Employee", "Add Role", "Update Employee Role"]
    }])  
      .then(function(next) 
    {
        switch (next.action){
            case "View All Departments":
            viewDepartments();
            break;

            case "View All Employees":
            viewEmployees();
            break;

            case "View ALL Roles":
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
    })
}

const viewDepartments = () =>{
    
}
const viewEmployees = () =>{

}
const viewRoles = () =>{

}
const addDepartment = () =>{

}
const addEmployee = () =>{

}
const addRole = () =>{

}
const updateRole = () =>{

}