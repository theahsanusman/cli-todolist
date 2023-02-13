import inquirer from "inquirer";
const todo = [];
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
async function updateStatus() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: "Enter Task id that you want to update status of"
        }
    ]);
    if (!answer.id)
        updateStatus();
    else if (todo.findIndex(item => item.id === answer.id)) {
        console.log('No Task found with this Id. Try again!');
        updateStatus();
    }
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
    if (!answer.id)
        deleteTodo();
    else if (todo.findIndex(item => item.id === answer.id)) {
        console.log('No Task found with this Id. Try again!');
        deleteTodo();
    }
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
            choices: ['Create Todo', 'Update Status', 'Delete Todo', 'Exit'],
            message: "Choose action that you'd like to perfrom"
        }
    ]).then(res => {
        switch (res.nextAction) {
            case "Create Todo":
                createTodo();
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
    });
}
start();
