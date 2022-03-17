import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
              <Link to = {`/project/${project.name}`} >{project.name}</Link>
           </td>
           <td>
               {project.project_users}
           </td>
           <td>
               {project.link}
           </td>
       </tr>
   )
}

const ProjectList = ({projects}) => {

   return (
       <table>
           <th>
               Name
           </th>
           <th>
               Project users
           </th>
           <th>
               Link
           </th>
           {projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectList