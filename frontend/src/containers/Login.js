import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import {withStyles} from "material-ui/styles"
import LoginForm from '../components/LoginForm'
import { loginPatient, loginClinic, loginDoctor } from '../actions/auth'
import { authErrors, isAuthenticated } from '../reducers'
import { TabContent, TabPane, Nav, NavItem, NavLink, Jumbotron, 
        Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap'
import classnames from 'classnames';
import login_banner from "../images/login-banner.jpg"
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
    bannerTextContainer: {
        backgroundColor: "rgba(255,255,255,0)",
        color: "#fff",
    },
    bannerTextJumbotron: {
        backgroundColor: "rgba(255,255,255,0.4)",
    },
    root: {
        // marginRight: 0,
    },
    sideBanner: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(1,2,3,1)",
        backgroundImage: "url("+login_banner + ")",
        height: "100vh",
    },
    loginJumbo: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f3f3f3",
    },
    loginContainer: {
        backgroundColor: "rgba(0,0,0,0)",
        color: "#333"
    },
    tabContent: {
        marginTop: 16,
    },
    navbar: {
        backgroundColor: "rgba(24,36,32,0.01)"
    },
})
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
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

    render(){
        const {classes} = this.props

        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        
        var signInText = null
        switch(this.state.activeTab){
            case '1':
                signInText = (
                    <Typography variant="display1" gutterBottom> Log in as an User</Typography>
                )
                break;
            case '2':
                signInText = (
                    <Typography variant="display1" gutterBottom> Log in as a Clinic</Typography>
                )
                break;
            case '3':
                signInText = (
                    <Typography variant="display1" gutterBottom> Log in as a Doctor</Typography>
                )
                break;
            default:
                signInText = (
                    <Typography variant="display1" gutterBottom> Log in</Typography>
                )
                break;
        }

        return (
            <div>
                <Navbar fixed="top"  light className={classes.navbar}>
                    <NavbarBrand href="/" className="mr-auto">
                        <Typography variant="title"> <strong>Carebox</strong></Typography>
                    </NavbarBrand>
                </Navbar>
                <Row className={classes.root}>
                    <Col xs={12} md={6} className={classes.sideBanner}>
                        <Container fluid className={classes.bannerTextContainer}>
                            <Jumbotron className={classes.bannerTextJumbotron}>
                                <Typography variant="display2"> <strong>Carebox</strong> brings subscription based healthcare to your fingertips</Typography>
                            </Jumbotron>
                        </Container>
                    </Col>
                    <Col xs={12} md={6} className={classes.loginJumbo}>
                        <Container>
                        <Jumbotron fluid className={classes.loginContainer}> 
                            {signInText}
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        User
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        Clinic/Hospital
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}
                                    >
                                        Doctor
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <div className={classes.tabContent}>
                                        <LoginForm type="user" {...this.props} onSubmit={this.props.onSubmitPatient} />
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className={classes.tabContent}>
                                        <LoginForm type="clinix" {...this.props} onSubmit={this.props.onSubmitClinic} />
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className={classes.tabContent}>
                                        <LoginForm type="doctor" {...this.props} onSubmit={this.props.onSubmitDoctor} />
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Jumbotron>
                        </Container>
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));