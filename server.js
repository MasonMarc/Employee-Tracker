const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
})

const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                console.table(employees)
            });
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, departments) => {
                console.table(departments)
            });
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles)
            });
        }
    }
}

let chooseList = () => {
const prompt = inquirer.createPromptModule();
prompt ({
    type: 'list',
    name: 'selection',
    message: 'choose one of the following',
    choices: ['VIEW ALL EMPLOYEES','VIEW ALL DEPARTMENTS','VIEW ALL ROLES']
    
})
.then((answers) => {
    chooseOption(answers.selection);
})
};

chooseList();