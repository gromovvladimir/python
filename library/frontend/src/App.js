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
           'token': ''

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
                        <li><Link to='/todos/'>Todos</Link></li>
                        <li>{this.isAuth() ? <button onClick={()=>this.logout()} >Logout</button> : <Link to='/login'>Login</Link>}</li>
                    </nav>

                <Routes>


                        <Route exact path='/' element = {<UserList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectList projects={this.state.projects} />} />
                        <Route exact path='/todos' element = {<TodoList todos={this.state.todos} />} />
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
