INSERT INTO employee (first_name, last_name, job_title, manager_id)
VALUES ("Rayito", "Aguirre", "Salesperson", 5),
       ("Pedro", "Pascal", "Lead Engineer", 4),
       ("Viola", "Davis", "Account Manager", 3),
       ("Elle", "Woods", "Lawyer", 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Salesperson", 50000, 1),
       (003, "Lead Engineer", 100000, 2),
       (004, "Account Manager", 120000, 3),
       (005, "Lawyer", 300000, 4);

INSERT INTO department (id, department_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");