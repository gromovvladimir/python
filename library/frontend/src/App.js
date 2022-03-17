import React from 'react';

import { Routes, BrowserRouter, Link, Route, useLocation, Navigate} from 'react-router-dom'
import './App.css';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import TodoList from './components/TodoList.js'
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import ProjectInformation from './components/ProjectInfo.js'
import axios from 'axios'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
   )
}

class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [] ,
           'projects': [],
           'todos': []

       }
   }

   componentDidMount() {
      axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            const users = response.data;
            this.setState({'users': users});
      }).catch(error => console.log(error))
      axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            const projects = response.data;
            this.setState({'projects': projects});
      }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/todos/').then(response => {
            const todos = response.data;
            this.setState({'todos': todos});
      }).catch(error => console.log(error))
   }



   render () {
       return (
           <div>
             <Menu/>
                <BrowserRouter>

                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects/'>Projects</Link></li>
                        <li><Link to='/todos/'>Todos</Link></li>
                    </nav>

                <Routes>


                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element = {<TodoList todos={this.state.todos} />} />
                        <Route exact path='/project/:name' element = {<ProjectInformation projects={this.state.projects} />} />
                        <Route exact path='users' element = {<Navigate to='/' />} />
                        <Route path="*" element = {<NotFound />} />

                </Routes>
             </BrowserRouter>
             <Footer />
           </div>
       )
   }
}


export default App;
