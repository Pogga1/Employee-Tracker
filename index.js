const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const database = mysql.createConnection(
   process.env.DB_HOST,
   process.env.DB_USER,
   process.env.DB_PASSWORD,
   {
    host: 'localhost',
    database: 'employeeTracker_db',
    port: 3306
   }
);

database.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log('Connected Succesfully');
        emmployeePrompt();
    }
});

const emmployeePrompt = async () => { 
    await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View All Departments", "View All Employees", "View All Roles", "Add Department", "Add Employee", "Add Role", "Update Employee Role"]
    })  
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