const $ = document

const inputAddTodoElem = $.getElementById('input-box-add-todo')
const btnAddTodoElem = $.querySelector('.btn-add-todo')
const btnClearAllTodosElem = $.querySelector('.btn-clear-all-todo')
const containerTodosElem = $.querySelector('.container-todos-inner')


let inputAddTodoValue = null
let todosArray = []

inputAddTodoElem.addEventListener('keyup', e => {

    inputAddTodoValue = inputAddTodoElem.value.trim()

    if (e.keyCode === 13) {
        if (inputAddTodoValue) {
            console.log(inputAddTodoValue)
            generateTodoTemplateToDom(inputAddTodoValue)
        }
    }
})

btnAddTodoElem.addEventListener('click', () => {
    inputAddTodoValue = inputAddTodoElem.value.trim()
    if (inputAddTodoValue) {
        console.log(inputAddTodoValue)
        generateTodoTemplateToDom(inputAddTodoValue)
    }
})

