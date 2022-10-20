INSERT INTO departments(id, name)
VALUES (1, 'Board'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal'),
       (5, 'Sales');

INSERT INTO roles (department_id, title, salary)
VALUES (1, "CEO", 500000),
       (2, "Lead Engineer", 200000),
       (2, "Software Engineer", 130000),
       (3, "Accountant Manager", 160000),
       (3, "Accountant", 100000),
       (4, "Legal Team Lead", 300000),
       (4, "Lawyer", 200000),
       (5, "Sales Lead", 100000),
       (5, "Salesperson", 80000);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES