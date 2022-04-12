import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', project_users: '', link: ''}
    }

    handleSubmit(event) {
        this.props.newProject(this.state.name, this.state.project_users, this.state.link )
        event.preventDefault()
    }

    handleUserChange(event) {
        if (!event.target.selectedOptions) {
            return
        }
        let users = []
        for (let i=0; i < event.target.selectedOptions.length ; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }
        this.setState({
            'project_users': users
        })
    }

    handleNameChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }



    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" onChange={(event) => this.handleNameChange(event)} value={this.state.name} />
                <input type="text" name="link" placeholder="link" onChange={(event) => this.handleNameChange(event)} value={this.state.link} />
                <select multiple onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((users) => <option value={users.id}>{users.first_name} {users.last_name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        );
    }
}
export default ProjectForm