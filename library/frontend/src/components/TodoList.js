import React from 'react'


const TodoItem = ({todo, deleteTodo}) => {
   return (
       <tr>
           <td>
              {todo.id}
           </td>
           <td>
              {todo.text}
           </td>
           <td>
               {todo.created}
           </td>
           <td>
               {todo.updated}
           </td>
           <td>
               {todo.is_active}
           </td>
           <td>
               {todo.project}
           </td>
           <td>
               {todo.todo_user}
           </td>
           <td><button onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
       </tr>
   )
}

const TodoList = ({todos, deleteTodo}) => {
   return (
       <table>
           <th>
               Id
           </th>
           <th>
               Text
           </th>
           <th>
               Created
           </th>
           <th>
               Updated
           </th>
           <th>
               Is_active
           </th>
           <th>
               Project
           </th>
           <th>
               Todo user
           </th>
           {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo} />)}
           <th></th>

       </table>
   )
}

export default TodoList