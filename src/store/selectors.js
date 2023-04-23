import { createSelector } from "@reduxjs/toolkit"

export const selectTodos = state => state.todoList.todos
export const selectFilterTodos = state => state.filter


export const filterTodosSelector = createSelector(
    [selectTodos, selectFilterTodos],
    (todos, filteredTodos) => {
        const remainingTodos = todos.filter(item => item.completed === false).length
        switch(filteredTodos.status) {
            case 'completed' :
                filteredTodos = todos.filter(item => item.completed === true)
                break; 
            case 'uncompleted' :
                filteredTodos = todos.filter(item => item.completed === false)
                break;
            default :
                filteredTodos = todos
        }
        return {filteredTodos, remainingTodos}
    }
)




