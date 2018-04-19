import React, { Component } from 'react'
import { Form } from 'reactstrap';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {MenuItem} from 'material-ui/Menu';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    signupButton: {
        float: "right",
        borderRadius: 50,
    }
})

const gender_options = [
    {
        value: 'M',
        label: 'Male',
    },
    {
        value: 'F',
        label: 'Female',
    },
    {
        value: 'T',
        label: 'Third Gender',
    },
];

class SignupForm extends Component {
    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        mobile: '',
        password: '',
        verifyerror: false,
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
    verifyPassword = (event) => {
        const target = event.target;
        const value = target.type ===
            'checkbox' ? target.checked : target.value;
        if( value === this.state.password ){
            this.setState({
                verifyerror: false
            })
        }
        else{
            this.setState({
                verifyerror: true
            })
        }
    } 

    onSubmit = (event) => {
        event.preventDefault()
        let data = {
            user: {
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
            },
            mobile: this.state.mobile,
            gender: this.state.gender,
        }
        this.props.onSubmit(data)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                id="username-input"
                                label="Username"
                                name="username"
                                placeholder="Username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="first_name-input"
                                label="First Name"
                                name="first_name"
                                placeholder="First Name"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="last_name-input"
                                label="Last Name"
                                name="last_name"
                                placeholder="Last Name"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="mobile-input"
                                label="Mobile Number"
                                name="mobile"
                                placeholder="Mobile No"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email-input"
                                label="Email"
                                name="email"
                                placeholder="name@example.com"
                                type="email"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={this.state.verifyerror}
                                id="verify_password-input"
                                label="Verify Password"
                                name="verify_password"
                                placeholder="verify password"
                                type="password"
                                fullWidth
                                onChange={this.verifyPassword}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                value={this.state.gender}
                                id="gender-input"
                                label="Gender"
                                name="gender"
                                placeholder="Gender"
                                fullWidth
                                onChange={this.handleInputChange}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                margin="normal"
                            >
                                {gender_options.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <Button type="submit" className={classes.signupButton} variant="raised" color="secondary">
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </div>
        )
    }
}

export default withStyles(styles)(SignupForm)