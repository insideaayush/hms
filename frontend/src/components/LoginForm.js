import React, { Component } from 'react'
import { Alert, Form } from 'reactstrap';
import {withStyles} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    loginButton:{
        float: "right",
        borderRadius: 50,
    }
})

class LoginForm extends Component {
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

    onSubmit = (event) => {
        event.preventDefault()
        this.props.onSubmit(this.state.username, this.state.password)
    }

    render() {
        const {classes} = this.props
        const errors = this.props.errors || {}
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        {errors.non_field_errors ? <Grid item xs={12}> <Alert color="danger">{errors.non_field_errors}</Alert> </Grid>: null}
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                id="username-input"
                                label="Username"
                                name="username"
                                placeholder="username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <TextField
                                id="password-input"
                                label="Password"
                                name="password"
                                placeholder="password"
                                type="password"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>                            
                        <Grid item xs={12}>
                            <Button type="submit" className={classes.loginButton} variant="raised" color="primary">
                                Login
                            </Button>
                        </Grid>                
                    </Grid>
                </Form>
            </div>
        )
    }
}

export default withStyles(styles)(LoginForm)