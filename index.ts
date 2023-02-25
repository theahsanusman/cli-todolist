import inquirer from "inquirer";

type Todo = {
    createdAt: string,
    name: string,
    status: boolean,
    id: string
}

const todo: Todo[] = [];

async function createTodo() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'todo',
            message: "Enter Task you want to do"
        }
    ]);
    todo.push({
        createdAt: new Date().toLocaleString(),
        id: `${Date.now()}`,
        name: answer.todo,
        status: false
    });
    console.log(todo);
    start();
}

function viewTodos() {
    if (!todo.length) {
        console.log('No todos!');
    } else {
        console.log(`No. | Id | Name | Status`);
        todo.forEach((t, i) => {
            console.log(`${i + 1}. | ${t.id} | ${t.name} | ${t.status}`);
        });
    }
    start();
}

async function updateStatus() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "Enter Task id that you want to update status of"
        }
    ]);
    answer.id = answer.id.trim();
    if (!answer.id) updateStatus();
    else if (todo.findIndex(item => item.id === answer.id)) { console.log('No Task found with this Id. Try again!'); updateStatus(); }
    else {
        const i = todo.findIndex(item => item.id === answer.id);
        todo[i].status = !todo[i].status;
        console.log(todo);
        start();
    }
}

async function deleteTodo() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "Enter Task id that you want to delete"
        }
    ]);
    answer.id = answer.id.trim();
    if (!answer.id) deleteTodo();
    else if (todo.findIndex(item => item.id === answer.id)) { console.log('No Task found with this Id. Try again!'); deleteTodo(); }
    else {
        const i = todo.findIndex(item => item.id === answer.id);
        todo.splice(i, 1);
        console.log(todo);
        start();
    }
}

function start() {

    inquirer.prompt([
        {
            type: 'list',
            name: 'nextAction',
            choices: ['Create Todo', 'View Todos', 'Update Status', 'Delete Todo', 'Exit'],
            message: "Choose action that you'd like to perfrom"
        }
    ]).then(res => {
        switch (res.nextAction) {
            case "Create Todo":
                createTodo();
                break;
            case "View Todos":
                viewTodos();
                break;
            case "Update Status":
                updateStatus();
                break;
            case "Delete Todo":
                deleteTodo();
                break;
            case "Exit":
                break;
        }
    })
}

start();