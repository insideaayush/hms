import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { Link } from 'react-router-dom'

// Action and Reducers
import { loginPatient, loginClinic, loginDoctor, signupPatient } from '../actions/auth'
import { authErrors, isAuthenticated } from '../reducers'

// UI imports
import {withStyles} from "material-ui/styles"
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Jumbotron, Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap'

// Components
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

// Other
import login_banner from "../images/login-banner.jpg"
import login_graphics from "../images/login_graphics.png"
import signup_graphics from "../images/sigup_banner.png"

const styles = (theme) => ({
    bannerTextContainer: {
        backgroundColor: "rgba(255,255,255,0)",
        color: "#fff",
    },
    bannerTextJumbotron: {
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    sideBanner: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(1,2,3,1)",
        backgroundImage: "url("+login_banner + ")",
        minHeight: "100vh",
    },
    rightJumbo: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ECEFF1",
    },
    loginContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        color: "#333"
    },
    navbar: {
        backgroundColor: "rgba(0,188,212,0.01)"
    },
    signupButton: {
        borderRadius: 50,
    },
    loginBannerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    actionButtons: {
        margin: 2
    }
})

const LoginContainer = (props) => {
    const {classes} = props
    return (
        <div>
            <Container>
                <Jumbotron fluid className={classes.loginContainer}>
                    <div className={classes.loginBannerContainer}>
                        <div>
                            <img alt="login" src={login_graphics} />
                        </div>
                    </div>
                    <LoginForm errors={props.errors} onSubmit={props.onSubmitPatient} />
                </Jumbotron>
            </Container>
        </div>
    )
}

const SignupContainer = (props) => {
    const {classes} = props
    return (
        <div>
            <Container>
                <Jumbotron fluid className={classes.loginContainer}>
                    <div className={classes.loginBannerContainer}>
                        <div>
                            <img alt="login" src={signup_graphics} />
                        </div>
                    </div>
                    <SignupForm errors={props.errors} onSubmit={props.signupPatient} />
                </Jumbotron>
            </Container>
        </div>
    )
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {
            activeTab: '1',
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleSignUp(){
    }

    render(){
        const {classes} = this.props

        const routes = [
            {
                path: "/login/",
                exact: true,
                main: () => <LoginContainer {...this.props}/>,
            },
            {
                path: "/signup/",
                exact: true,
                main: () => <SignupContainer {...this.props}/>,
            },
        ];

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        

        return (
            <div>
                <Navbar fixed="top"  light className={classes.navbar}>
                    <NavbarBrand href="/" className="mr-auto">
                        <Typography variant="title"> <strong>Carebox</strong></Typography>
                    </NavbarBrand>
                    <div className={classes.actions}>
                        <div className={classes.actionButtons}>
                            <Link to="/login/">
                                <Button mini variant="raised" color="primary" className={classes.signupButton}> 
                                    Log in
                                </Button>
                            </Link>
                        </div>
                        <div className={classes.actionButtons}>
                            <Link to="/signup/">
                                <Button mini variant="raised" color="secondary" className={classes.signupButton}> 
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Navbar>
                <Row>
                    <Col xs={12} md={6} className={classes.sideBanner}>
                        <Container fluid className={classes.bannerTextContainer}>
                            <Jumbotron className={classes.bannerTextJumbotron}>
                                <Typography variant="display2"> <strong>Carebox</strong> brings subscription based healthcare to your fingertips</Typography>
                            </Jumbotron>
                        </Container>
                    </Col>
                    <Col xs={12} md={6} className={classes.rightJumbo}>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: authErrors(state),
    isAuthenticated: isAuthenticated(state)
})

const mapDispatchToProps = (dispatch) => ({
    onSubmitPatient: (username, password) => {
        dispatch(loginPatient(username, password))
    },
    onSubmitClinic: (username, password) => {
        dispatch(loginClinic(username, password))
    },
    onSubmitDoctor: (username, password) => {
        dispatch(loginDoctor(username, password))
    },
    signupPatient: (data) => {
        dispatch(signupPatient(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));