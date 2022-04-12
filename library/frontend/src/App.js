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
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'




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
           'todos': [],
           'token': '',




       }
   }




   getData() {
      const headers = this.getHeader()
      axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
            this.setState({'users': response.data})
      }).catch(error => {
        console.log(error)
        this.setState({users: []})
      })
      axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
        this.setState({'projects': response.data})
      }).catch(error => {
        console.log(error)
        this.setState({projects: []})
      })

      axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then(response => {
            this.setState({'todos': response.data})
      }).catch(error => {
        console.log(error)
        this.setState({todos: []})
      })
   }

   isAuth() {
        return !!this.state.token
   }

   getHeader() {
        if (this.isAuth())
            return {
                'Authorization': 'Token ' + this.state.token
        }
        return {}
   }

   getToken(login,password) {
        console.log(login, password)
        axios.post('http://127.0.0.1:8000/api-token-auth/',{'username': login, 'password': password})
        .then(response => {
            const token = response.data.token
            console.log(token)
            localStorage.setItem('token', token)
            this.setState({
                'token': token
            },this.getData)
        })
        .catch(error => alert('Неверный логин или пароль'))
   }

   newProject(name, project_users, link) {
        const headers = this.getHeader()
        console.log(name, project_users, link)
        axios.post('http://127.0.0.1:8000/api/projects/', {'name': name, 'project_users': project_users, 'link': link}, {headers})
          .then(response => {
            this.getData()
          }).catch(error => console.log(error))
   }

   newTodo(text, project, todo_user) {
        const headers = this.getHeader()
        console.log(text, project, todo_user)
        axios.post('http://127.0.0.1:8000/api/todos/', {'text': text, 'project': project, 'todo_user': todo_user}, {headers})
          .then(response => {
            this.getData()
          }).catch(error => console.log(error))
   }



   deleteProject(id) {
      const headers = this.getHeader()
      axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
          .then(response => {
            this.setState({projects: this.state.projects.filter((project)=>project.id !==id)})
          }).catch(error => console.log(error))
   }

   deleteTodo(id) {
      const headers = this.getHeader()
      axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers})
          .then(response => {
            this.setState({todos: this.state.todos.filter((todo)=>todo.id !==id)})
          }).catch(error => console.log(error))
   }


   logout() {
       localStorage.setItem('token', '')
       this.setState({
           'token': ''
       },this.getData)
   }




   componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
             'token':token
        },this.getData)
   }

    render () {
       return (
           <div>

             <Menu/>





                <BrowserRouter>

                    <nav>
                        <li><Link to='/'>Users</Link></li>
                        <li><Link to='/projects/'>Projects</Link></li>
                        <li><Link to='/projects/create/'>New Project</Link></li>
                        <li><Link to='/todos/'>Todos</Link></li>
                        <li><Link to='/todos/create'>New Todo</Link></li>
                        <li>{this.isAuth() ? <button onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link>}</li>
                    </nav>

                <Routes>


                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)} />} />
                        <Route exact path='/projects/create' element = {<ProjectForm users={this.state.users} newProject={(name, project_users) => this.newProject(name, project_users)} />} />
                        <Route exact path='/todos' element = {<TodoList todos={this.state.todos} deleteTodo={(id) => this.deleteTodo(id)} />} />
                        <Route exact path='/todos/create' element = {<TodoForm users={this.state.users} projects={this.state.projects} newTodo={(text, project, todo_user) => this.newTodo(text, project, todo_user)} />} />
                        <Route exact path='/project/:name' element = {<ProjectInformation projects={this.state.projects} />} />

                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)}/>} />
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
