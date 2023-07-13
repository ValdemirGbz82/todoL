// criando um local storage

// let bancoDeDados = [
//     {matricula:1, nome:"Carlos",curso:'javascript', nota: 9.8},
//     {matricula:2, nome:"Luana",curso:'Python', nota: 8.8}
// ]


// como armazenar no local storage
//localStorage.setItem('alunos',JSON.stringify(bancoDeDados))

// como pegar os dados do local storage
//const data = localStorage.getItem('alunos')
//console.log(data)


// criando o nosso banco de dados

const storage = localStorage.getItem('tasks') || '[]'
let dados = JSON.parse(storage)


const inputAdd = document.querySelector('.input-add')
const btnAdd = document.querySelector('.btn-add')
const tasks = document.querySelector ('.tasks')

// função que adiciona tarefa na lista
function addTaskToList() {
    // pegando o valor digitado
    const tarefa = inputAdd.value

    // criando o abjeto que será adicionado 
    const item = {
        id: crypto.randomUUID(),
        name: tarefa,
        checked: false
    }
    // adicionando a tarefa
    dados.push(item)
    // adicionando ao local storage
    localStorage.setItem('tasks',JSON.stringify(dados))
    alert('Tarefa adicionada com sucesso')
    inputAdd.value = ''
    inputAdd.focus()
    populateTasks()
}

// criando a função de deletar tarefas 
function deleteTask(id){
    let newList = dados.filter(item => item.id !== id)
    dados = newList
    populateTasks()
    localStorage.setItem('tasks', JSON.stringify(dados))
}

function changeTask(id){
    const checkbox = document.getElementById(id)
    let newList = dados.map(item =>{
        if(item.id === id){
            item.checked = checkbox.checked
        }return item
    })
    dados = newList
    localStorage.setItem('tasks', JSON.stringify(dados))
    populateTasks()
}


function populateTasks() {
    let taskItems = ""
    // percorrendo todas as tasks
    dados.forEach(task =>{
        taskItems += `
        <li>
            <label for = "${task.id}">
                <input onChange = "changeTask('${task.id}')" type = "checkbox" id = "${task.id}" ${task.checked ? "checked" : ""}>
                <span>${task.name}</span>
            </label>
            <i class = "bx bx-trash" onclick="deleteTask('${task.id}')"></i>
        </li>                
        `
    })
    tasks.innerHTML = taskItems
}


// criando os eventos

inputAdd.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter') {
        addTaskToList()
    }
})

btnAdd.addEventListener('click', addTaskToList)


populateTasks()





















