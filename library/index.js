// import { attach } from "./store.js";
// import App from './component/App.js'

// attach(App, document.getElementById('root'))

const list = document.querySelector('.list')
const btn = document.querySelector('.btn-submit')
const input = document.querySelector('input')

const cars = []

function addTodo(todo) {
    cars.push(todo)
}

btn.addEventListener('click', () => {
    cars.push(input.value)
    renderTodo()
})

function renderTodo() {
    list.innerHTML =  cars.map(car => `<li>${car}</li>`)
}

