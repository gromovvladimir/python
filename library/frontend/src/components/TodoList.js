import React from 'react'


const TodoItem = ({todo}) => {
   return (
       <tr>
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
       </tr>
   )
}

const TodoList = ({todos}) => {
   return (
       <table>
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
           {todos.map((todo) => <TodoItem todo={todo} />)}
       </table>
   )
}

export default TodoList