import React from 'react'
import {useParams} from 'react-router-dom'



const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>
              {project.name}
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

const ProjectInformation = ({projects}) => {
   var {name} = useParams()
   var filter_project = projects.filter((project) => project.name === name)

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
           {filter_project.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}


export default ProjectInformation