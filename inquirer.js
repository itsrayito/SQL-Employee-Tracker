const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

// connecting to the database
const company_db = mysql.createConnection(
    {
      host: 'localhost',
      // mySQL username
      user: 'root',
      // mySQL password
      password: 'Edgarin123',
      database: 'company_db'
    },
    console.log('')
  );
  

// viewing options
const optionsQ = [
    {
        type: 'list',
        message: "Select an option from the menu",
        choices: ["View departments", "View roles", "View employees", "Add a new department", "Add a new role", "Add a new employee", "Update an employee's job title"],
        name: 'menuOptions', 
    },
]

const departmentQ = [
    {
        type: 'input', 
        message: 'What is the new department name?',
        name: 'newDepartment', 
    },
]

const roleQ = [
    {
        type: 'input', 
        message: 'What is the title of this new role?',
        name: 'roleTitle',
    },
    {
        type: 'input', 
        message: 'What is the salary?',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'What is the department ID of this new role?',
        choices: ['001', '002', '003', '004', '005', '006', '007', '008'],
        name: 'deptId'
    },
]

const employeeQ = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName',
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName',
    },
    {
        type: 'input',
        message: "What is the employee's job title?",
        name: 'jobTitle',
    },
    {
        type: 'input',
        message: "What is the employee's manager ID?",
        name: 'managerId',
    },
    {
        type: 'list',
        message: 'What is the role ID of this new employee',
        choices: ['001', '002', '003', '004', '005', '006', '007', '008'],
        name: 'roleId'
    },
]

const updateQ = [
    {
        type: 'input', 
        message: "What is the employee's ID number?",
        name: 'idNumber'
    },
    {
        type: 'input', 
        message: "What is the employee's new job title?",
        name: 'updateTitle'
    }
]


// the prompts
const firstQuestion = () => {
    return inquirer 
        .prompt(optionsQ)
        .then((data) => {
           if (data.menuOptions == "Add a new department") {
               addDepartment(); 
           } else if (data.menuOptions == "Add a new role") {
               addRole(); 
           } else if (data.menuOptions == "Add a new employee") {
               addEmployee(); 
           } else if (data.menuOptions == "Update an employee's job title") {
               updateTitle(); 
           } else if (data.menuOptions == "View departments") {
                company_db.query(`SELECT * FROM department`, function (err,results) {
                console.table(results); 
                firstQuestion(); 
            }) 
           } else if (data.menuOptions == "View roles") {
                company_db.query(`SELECT * FROM role`, function (err,results) {
                console.table(results); 
                firstQuestion(); 
            }) 
           } else if (data.menuOptions == "View employees") {
                company_db.query(`SELECT * FROM employee`, function (err,results) {
                console.table(results); 
                firstQuestion(); 
            })
        }
})
}


const addDepartment = () => {
    return inquirer 
        .prompt(departmentQ)
        .then((data) => {
            // query for DEPARTMENT (to add this new data into the database)
            company_db.query(`INSERT INTO department( department_name) VALUES ("${data.newDepartment}")`, (err,result) => {
                if (err) {
                console.log(err)
                }
                console.log(`
                
                ${data.newDepartment} has been added to the database!`)
            });
            firstQuestion(); 
        })
}

const addRole = () => {
    return inquirer 
        .prompt(roleQ)
        .then((data) => {
            // query for ROLE
            company_db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${data.roleTitle}", "${data.roleSalary}", "${data.deptId}")`, (err, result) => {
                if (err) {
                console.log(err)
                }
                console.log(`
                
                ${data.roleTitle} has been added to the database!`)
            });
            firstQuestion(); 
        })
}


const addEmployee = () => {
    return inquirer 
        .prompt(employeeQ)
        .then((data) => {
            // query for EMPLOYEE
            company_db.query(`INSERT INTO employee (first_name, last_name, job_title, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.jobTitle}", "${data.roleId}", "${data.managerId}")`,  
            (err,result) => {
            if (err) {
                console.log(err)
            }
            console.log(`
            
            ${data.firstName} ${data.lastName} has been added to the database!`)
            });
            firstQuestion(); 
        })
}

const updateTitle = () => {
    return inquirer 
        .prompt(updateQ) 
        .then((data) => {
            // update employee job title 
            company_db.query(`UPDATE employee SET job_title = "${data.updateTitle}" WHERE id = "${data.idNumber}"`,   
            (err,result) => {
            if (err) {
                console.log(err)
            }
            console.log(`
            
            Congratulations on the new job! The new title, ${data.updateTitle}, has been added to the database!`)
            });
            firstQuestion();
        })
}

// this will start the first question when the app is ran
firstQuestion();