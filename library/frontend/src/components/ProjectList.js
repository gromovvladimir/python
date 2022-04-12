import React from 'react'
import {Link} from 'react-router-dom'



const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>
               {project.id}
           </td>
           <td>
              <Link to = {`/project/${project.name}`} >{project.name}</Link>
           </td>
           <td>
               {project.project_users}
           </td>
           <td>
               {project.link}
           </td>
           <td><button onClick={()=>deleteProject(project.id)}>Delete</button></td>
       </tr>
   )
}


const ProjectList = ({projects, deleteProject}) => {

   return (

       <table>

           <th>
               Id
           </th>
           <th>
               Name
           </th>
           <th>
               Project users
           </th>
           <th>
               Link
           </th>
           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
           <th></th>

       </table>
   )
}


export default ProjectList