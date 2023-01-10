-- Sales --
    -- Senior Salesperson --
        -- Tania Dawson --
    -- Junior Salesperson --
        -- Emilie Vazquez --
    -- Manager of Sales --
        -- Zane Malone --
-- Marketing --
    -- Director --
        -- Zack Decker --
    -- Analyst --
        -- Phillip Robertson --
    -- Coordinator --
        -- Mariana Serrano --
-- Human Resources --
    -- Director --
        -- Shirley Fisher --
    -- Payroll Specialist --
        -- Saniyah Perry --
    -- HR Associate --
        -- Rosa Hahn --
 -- Executive --
    -- Chief Financial Officer --
        -- Joel May --
    -- Chief Executive Officer --
        -- Leyla Petty --
    -- Executive Vice President --
        -- Jose Myers --


INSERT INTO department (name)
VALUES
('Sales'),
('Marketing'),
('Human Resources'),
('Executive');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager of Sales', 60000, 1),
('Senior Salesperson', 55000, 1),
('Junior Salesperson', 40000, 1),
('Director', 80000, 2),
('Analyst', 60000, 2),
('Coordinator', 60000, 2),
('Director', 80000, 3),
('Payroll Specialist', 60000, 3),
('HR Associate', 50000, 3),
('Chief Financial Officer', 100000, 4),
('Chief Executive Officer', 90000, 4),
('Executive Vice President', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Tania', 'Dawson', 1, null), 
('Emilie', 'Vazquez', 2, 1), 
('Zane', 'Malone', 3, 1), 
('Zack', 'Decker', 4, null), 
('Phillip', 'Robertson', 5, 2), 
('Mariana', 'Serrano', 6, 2), 
('Shirley', 'Fisher', 7, null), 
('Saniyah', 'Perry', 8, 3), 
('Rosa', 'Hahn', 9, 3), 
('Joel', 'May', 10, null), 
('Leyla', 'Petty', 11, 4), 
('Jose', 'Myers', 12, 4);