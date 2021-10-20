INSERT INTO department (id, title)
VALUES (001, "Computers"),
       (002, "Books" ),
       (003, "Advertisement"),
       (004, "Secret Weapons"),
       (005, "Pets");
       
INSERT INTO job (id, title, salary, department_id)
VALUES (001, "Librarian", 3.50, 002),
       (002,  "Coder",45.50,001),
       (003, "Evil Scientist", 100.00,004),
       (004,  "Dog Walker", 9.99,005),
       (005, "Sales Person", 5.50,003),
       (006, "Manager", 100, 004);
INSERT INTO employee(id, first_name, last_name, job_id)
VALUES (001, "Jane", "Austin", 001),
        (002, "Johnny", "Cash", 005),
        (003, "Victor", "Frankenstein", 003),
        (004, "Matthew", "Wiessing", 002),
        (005, "Walter", "Stevens", 004),
        (006, "Bruce", "Wayne", 006);