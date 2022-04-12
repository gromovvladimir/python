import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: props.projects[0].id, todo_user:props.users[0].id}
    }

    handleSubmit(event) {
        this.props.newTodo(this.state.text, this.state.project,this.state.todo_user)
        event.preventDefault()
    }
    handleNameChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }




    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text" onChange={(event) => this.handleNameChange(event)}
                 value={this.state.text} />

                <select name="todo_user" onChange={(event)=>this.handleNameChange(event)}>
                    {this.props.users.map((users)=><option value={users.id}>{users.first_name} {users.last_name}</option>)}
                </select>
                <select name="project" onChange={(event)=>this.handleNameChange(event)}>
                    {this.props.projects.map((projects)=><option value={projects.id}>{projects.name} </option>)}
                </select>









                <input type="submit" value="Create" />
            </form>
        );
    }
}
export default TodoForm