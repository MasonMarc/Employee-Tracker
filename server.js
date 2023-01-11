const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    database: "employee_db",
}).promise();

const init = () => {
    prompt({
        type: 'rawlist',
        name: 'selection',
        message: 'choose one of the following',
        choices: ['VIEW ALL EMPLOYEES', 'VIEW ALL DEPARTMENTS', 'VIEW ALL ROLES', 'ADD A DEPARTMENT', 'ADD A ROLE', 'ADD AN EMPLOYEE', 'UPDATE AN EMPLOYEE ROLE']
    })
        .then((answers) => {

            chooseOption(answers.selection);
        })
};

const chooseOption = async (selection) => {
    switch (selection) {
        case 'VIEW ALL EMPLOYEES': {
            const val = await db.query('SELECT * FROM employee')
            console.table(val[0]);
            init();
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            const val1 = await db.query('SELECT * FROM department')
            console.table(val1[0])
            init();
            break;
        }
        case 'VIEW ALL ROLES': {
            const val2 = await db.query('SELECT * FROM role')
            console.table(val2[0])
            init();
            break;
        }
        case 'ADD A DEPARTMENT': {
            prompt({
                type: 'input',
                name: 'name',
                message: 'please enter new department name'
            })
                .then((answers) => {
                    insertDepartment(answers);
                    init();
                });
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
                    insertRole(answers);
                    init();
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
                    insertEmployee(answers)
                    init();
                });
            break;
        }
    }
};

const insertDepartment = async (answers) => {
    const val = await db.query(`INSERT INTO department (name)
        VALUES
        ('${answers.name}');`)
                    console.table(val[0])
}

const insertRole = async (answers) => {
    const val4 = await db.query(`INSERT INTO role (title, salary, department_id)
                    VALUES
                    ('${answers.title}', ${answers.salary}, 1);`)
    console.log(answers.title);
    console.log(answers.salary);
    console.table(val4[0])
}
const insertEmployee = async (answers) => {
    const val = await db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('${answers.first_name}', '${answers.last_name}', 1, 1);`)
    
    console.log(answers.first_name);
    console.log(answers.last_name);
    console.table(val[0])
}


init();
// const employeeRole = async () => {
//     const emp = await employeeList();
//     prompt({
//         type: 'rawlist',
//         name: 'selection',
//         message: 'choose employee to update role',
//         choices: emp,
//     })
//         .then((answers) => {
//             roleChange(answers);
//         })
// }

// const employeeList = async () => {
//     const employeeSelect = `SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`;
//     const employees = await db.query(employeeSelect);
//     return employees[0];
// };

// const roleChange = async (answers) => {
//     const val = await db.query(`UPDATE employee
//     SET role_id = 5
//     WHERE CONCAT(first_name, ' ', last_name) = '${answers.selection}';`);
//     console.log(val);
// }

// employeeRole();