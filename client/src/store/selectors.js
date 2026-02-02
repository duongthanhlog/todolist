import { createSelector } from "@reduxjs/toolkit"

export const selectTodos = state => state.todoList.todos
export const selectFilterTodos = state => state.filter.filteredList


export const filterTodosSelector = createSelector(
    [selectTodos, selectFilterTodos],
    (todos, filter) => {
        let filteredTodos
        const remainingTodos = todos.filter(todo => todo.completed === false).length
        switch(filter.status) {
            case 'completed' :
                filteredTodos = todos.filter(todo => todo.completed === true)
                break; 
            case 'uncompleted' :
                filteredTodos = todos.filter(todo => todo.completed === false)
                break;
            default :
                filteredTodos = todos
        }
        return {filteredTodos, remainingTodos}
    }
)




