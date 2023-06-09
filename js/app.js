const $ = document

const inputAddTodoElem = $.getElementById('input-box-add-todo')
const btnAddTodoElem = $.querySelector('.btn-add-todo')
const btnClearAllTodosElem = $.querySelector('.btn-clear-all-todo')
const containerTodosElem = $.querySelector('.container-todos-inner')
const likeRemoveTodoElem = $.querySelector('.like-remove-todo')
const likeEditTodoElem = $.querySelector('.like-edit-todo')
const inputUpdateTextTodoElem = $.querySelector('.input-update-text-todo')
const modalElem = $.querySelector('.modal')


let inputAddTodoValue = null
let todosArray = []

inputAddTodoElem.addEventListener('keyup', e => {

    inputAddTodoValue = inputAddTodoElem.value.trim()

    if (e.keyCode === 13) {
        if (inputAddTodoValue) {
            let newTodo = {
                id: todosArray.length + 1,
                title: inputAddTodoValue,
                created_Date: createNotesDate()
            }

            todosArray.push(newTodo)

            setItemTodoInfoInLocalStorage(todosArray)
            generateTodoTemplateToDom(todosArray)
            ClearInputValue()
        }
    }
})

btnAddTodoElem.addEventListener('click', () => {
    inputAddTodoValue = inputAddTodoElem.value.trim()
    if (inputAddTodoValue) {
        let newTodo = {
            id: todosArray.length + 1,
            title: inputAddTodoValue,
            created_Date: createNotesDate()
        }

        todosArray.push(newTodo)

        setItemTodoInfoInLocalStorage(todosArray)
        generateTodoTemplateToDom(todosArray)
        ClearInputValue()
    }
})

btnClearAllTodosElem.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
    containerTodosElem.innerHTML = ''
})

function createNotesDate() {
    return new Date().toLocaleDateString('fa-IR')
}

function setItemTodoInfoInLocalStorage(todosArray) {
    return localStorage.setItem('todos', JSON.stringify(todosArray))
}

function getItemTodoInfoInLocalStorage(todosArray) {
    let LocalStorageNotes = localStorage.getItem('todos')

    if (LocalStorageNotes) {
        todosArray = JSON.parse(LocalStorageNotes)
    } else {
        todosArray = []
    }

    return todosArray
}

function ClearInputValue() {
    inputAddTodoElem.value = ''
    inputAddTodoElem.focus()
}

window.addEventListener('load', () => {
    todosArray = getItemTodoInfoInLocalStorage()
    generateTodoTemplateToDom(todosArray)
})

function generateTodoTemplateToDom(todosArray) {

    containerTodosElem.innerHTML = ''

    todosArray.forEach((note, index) => {

        containerTodosElem.insertAdjacentHTML('beforeend', `
        <div class="col-12 my-1">
                        <div class="card">
                            <div class="card-body text-dark">
                                <p>${note.title}</p>
                            </div>
                            <div class="card-footer p-2">
                                <div class="row">
                                    <div class="col-5">
                                        <div class="dropdown">
                                            <button class="card-menu dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi text-dark bi-three-dots-vertical" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                  </svg>
                                            </button>
                                            <ul class="dropdown-menu">
                                              <li class="dropdown-item py-2 px-3" onclick="editMainTodo(${note.id})" data-bs-toggle="modal" data-bs-target="#editModal"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                  </svg>
                                            ویرایش
                                            </li>
                                              <li class="dropdown-item py-2 px-3" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="removeMainTodo(${index})">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                  </svg>
                                                حذف
                                              </li>
                                            </ul>
                                          </div>
                                    </div>
                                    <div class="col-7 text-end mt-1">
                                        <div class="date-create-todo">
                                            <span class="text-date text-white bg-orange pt-1 rounded-pill pb-0 px-2"> ${note.created_Date} </span>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        `)

    })
}

function removeMainTodo(todoIndex) {
    let allTodos = getItemTodoInfoInLocalStorage(todosArray)
    let todoID = todoIndex + 1

    console.log('get Index =', todoIndex)
    console.log('get ID =', todoID)

    likeRemoveTodoElem.addEventListener('click', () => {

        let removeTodo = allTodos.filter(todo => {
            return todo != allTodos[todoIndex]
        })

        console.log(removeTodo)
        allTodos = removeTodo

        generateTodoTemplateToDom(allTodos)
        setItemTodoInfoInLocalStorage(allTodos)
        location.reload()
    })

}

function editMainTodo(todoId) {
    let allTodos = getItemTodoInfoInLocalStorage(todosArray)
    todosArray = allTodos

    todosArray.forEach(todo => {
        if (todo.id === todoId) {
            inputUpdateTextTodoElem.value = todo.title
            let inputUpdateTextTodoValue = inputUpdateTextTodoElem.value.trim()

            likeEditTodoElem.addEventListener('click', () => {
                if (inputUpdateTextTodoValue) {
                    todo.title = inputUpdateTextTodoElem.value.trim()
                    todo.created_Date = createNotesDate()

                    generateTodoTemplateToDom(todosArray)
                    setItemTodoInfoInLocalStorage(todosArray)
                }
            })
        }
    })
}