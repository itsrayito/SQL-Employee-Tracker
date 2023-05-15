-- values in the department table 
INSERT INTO department (department_name) 
VALUES (newDepartment) 

-- values in the role table
INSERT INTO role (title, salary, department_id)
VALUES (newTitle, newSalary, newDepartmentId)

-- values in the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (newFirst, newLast, newRoleId, newManagerId)