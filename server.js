const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
})

const init = () => {
    prompt({
        type: 'rawlist',
        name: 'selection',
        message: 'choose one of the following',
        choices: ['VIEW ALL EMPLOYEES', 'VIEW ALL DEPARTMENTS', 'VIEW ALL ROLES', 'ADD A DEPARTMENT', 'ADD A ROLE', 'ADD AN EMPLOYEE']
    })
        .then((answers) => {

            chooseOption(answers.selection);
        })
};

const chooseOption = (selection) => {
    switch (selection) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                console.table(employees)
                init();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, departments) => {
                console.table(departments)
                init();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles)
                init();
            });
            break;
        }
        case 'ADD A DEPARTMENT': {
            prompt({
                type: 'input',
                name: 'name',
                message: 'please enter new department name'
            })
                .then((answers) => {
                    db.query(`INSERT INTO department (name)
        VALUES
        ('${answers.name}');`,
                        (err, departments) => {
                            console.table(departments)
                            init();
                        });
                })
            break;
        }
        case 'ADD A ROLE': {
            prompt([{
                type: 'input',
                name: 'title',
                message: 'please enter name of new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'please enter salary of new role'
            },
            ])
                .then((answers) => {
                    console.log(answers.title);
                    console.log(answers.salary);
                    db.query(`INSERT INTO role (title, salary, department_id)
                    VALUES
                    ('${answers.title}', ${answers.salary}, 1);`,
                        (err, roles) => {
                            console.table(roles)
                            init();
                        });
                })
            break;
        }
        case 'ADD AN EMPLOYEE': {
            prompt([{
                type: 'input',
                name: 'first_name',
                message: 'please enter first name of new employee'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'please enter last name of new employee'
            },
            ])
                .then((answers) => {
                    console.log(answers.first_name);
                    console.log(answers.last_name);
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES
                    ('${answers.first_name}', '${answers.last_name}', 1, 1);`,
                        (err, employees) => {
                            console.table(employees)
                            init();
                        });
                })
            break;
        }
    }
};



init();