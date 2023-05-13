function addRole() {
    // query the database for existing departments
    connection.query('SELECT id, name FROM department', (err, res) => {
        if (err) throw err;

        // this will prompt the user for information on the role
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:'
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter the salary for the role:'
            },
            {
                name: 'department',
                type: 'list',
                message: 'Select the department for the role:',
                choices: res.map(department => ({
                    name: department.name,
                    value: department.id
                }))
            }
        ]).then(answers => {
            // insert the new role into the database
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.department
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`New role "${answers.title}" added to database.`);
                    // this is will return to the main menu
                    mainMenu();
                }
            );
        });
    });
}

// the function to display the departments, employees and their roles
function displayData() {
    // query for the departments in the database
    connection.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;

        // this will prompt the user to select a department
        inquirer.prompt([
            {
                name: 'department',
                type: 'list',
                message: 'Select a department:',
                choices: departmenyts.map(department => department.name)
            }
        ]).then(departmentAnswer => {
            // query the database for the roles in the chosen department
            connection.query(`SELECT role.id, role.title, role.salary
            FROM role
            JOIN department ON role.department_id = department.id
            WHERE department.name = ?`, [departmentAnswer.department], (err, roles) => {
                if (err) throw err;

                // this will promnpt the user to select a role
                inquirer.prompt([
                    {
                        name: 'role',
                        type: 'list',
                        message: 'Select a role:',
                        choices: roles.map(role => role.title)
                    }
                ]).then(roleAnswer => {
                    // query the database in the selected department and role for employees
                    connection.query(`SELECT employee.id, employee.first_name, employee.last_name
                    FROM employee
                    JOIN role ON employee.role_id = role.id
                    JOIN department ON role.department_id = department.id
                    WHERE department.name = ? AND role.title = ?`, [departmentAnswer.department, roleAnswer.role], (err, employees) => {
                        if (err) throw err;

                        // prompt the user to select an employee
                        inquirer.prompt([
                            {
                                name: 'employee',
                                type: 'list',
                                message: 'Select an employee:',
                                choices: employees.map(employee => employee.first_name + '' + employee.last_name)
                            }
                        ]).then(employeeAnswer => {
                            console.log(`You selected employee: ${employeeAnswer.employee}`);

                            // this will return to the main menu
                            mainMenu();
                        });
                    });
                });
                });
            });
        });
}