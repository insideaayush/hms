import React, { Component } from 'react'
import { Alert, Button, Form } from 'reactstrap';

import TextInput from './TextInput'

export default class LoginForm extends Component {
    state = {
        username: '',
        password: ''
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type ===
            'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.primaryInput.focus();
    }

    onSubmit = (event) => {
        console.log(this.state)
        event.preventDefault()
        this.props.onSubmit(this.state.username, this.state.password)
    }

    render() {
        const errors = this.props.errors || {}
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.non_field_errors ? <Alert color="danger">{errors.non_field_errors}</Alert> : ""}
                <TextInput name="username" id_suffix={this.props.type} label="Username" error={errors.username} getRef={input => this.primaryInput = input} onChange={this.handleInputChange} />
                <TextInput name="password" id_suffix={this.props.type} label="Password" error={errors.password} type="password" onChange={this.handleInputChange} />
                <Button type="submit" color="primary" size="lg">Log In</Button>
            </Form>
        )
    }
}