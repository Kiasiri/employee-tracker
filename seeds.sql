INSERT INTO department (id, title)
VALUES (001, "Computers"),
       (002, "Books" ),
       (003, "Advertisement"),
       (004, "Secret Weapons"),
       (005, "Pets");
       
INSERT INTO job (id, title, salary, department_id)
VALUES (001, "Librarian", 3.50, 002),
       (002,  "Coder", 45.50,001),
       (003, "Evil Scientist", 100.00,004),
       (004,  "Dog Walker", 9.6,005),
       (005, "Sales Person", 5.50,003),
       (006, "Manager", 100, 004);
INSERT INTO employee(id, first_name, last_name, job_id, manager_id)
VALUES (001, "Jane", "Austin", 001, NULL),
        (002, "Johnny", "Cash", 005, NULL),
        (003, "Victor", "Frankenstein", 003, NULL),
        (004, "Matthew", "Wiessing", 002, NULL),
        (005, "Walter", "Stevens", 004, NULL),
        (006, "Bruce", "Wayne", 006, NULL);