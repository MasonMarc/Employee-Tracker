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
        choices: ['VIEW ALL EMPLOYEES', 'VIEW ALL DEPARTMENTS', 'VIEW ALL ROLES', 'ADD A DEPARTMENT']
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
                    console.log(answers.name);
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
    }
};



init();