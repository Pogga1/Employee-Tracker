INSERT INTO departments(id, name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales');

INSERT INTO roles (department_id, title, salary)
VALUES (1, "Lead Engineer", 150000),
       (1, "Software Engineer", 120000),
       (2, "Accountant Manager", 160000),
       (2, "Accountant", 125000),
       (3, "Legal Team Lead", 250000),
       (3, "Lawyer", 190000),
       (4, "Sales Lead", 100000),
       (4, "Salesperson", 80000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Ashley', 'Rodriguez', 1, 1),
       ('Andrew', 'Eysoldt', 2, 2),
       ('Kunal', 'Singh', 3, 1),
       ('Malia', 'Brown', 4, 3),
       ('Sarah', 'Lourd', 5, 1),
       ('Tom', 'Allen', 6, 4),
       ('Kevin', 'Tupik', 7, 1),
       ('Mike', 'Chan', 8, 5);
       
       