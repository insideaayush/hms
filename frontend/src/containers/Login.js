import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import {withStyles} from "material-ui/styles"
import LoginForm from '../components/LoginForm'
import { login } from '../actions/auth'
import { authErrors, isAuthenticated } from '../reducers'
import { TabContent, TabPane, Nav, NavItem, NavLink, Jumbotron, Row, Col, Navbar, NavbarBrand} from 'reactstrap'
import classnames from 'classnames';
import login_banner from "../images/login-banner.jpg"
import Typography from 'material-ui/Typography';

const styles = (theme) => ({
    root: {
        marginRight: 0,
    },
    loginBanner: {
        backgroundImage: "url("+login_banner + ")",
        height: "100vh",
    },
    leftCol: {
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
        backgroundColor: "rgba(0,150,136,0)"
    }


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
        
        return (
            <div>
                <Navbar fixed="top"  light className={classes.navbar}>
                    <NavbarBrand href="/" className="mr-auto">carebox</NavbarBrand>
                </Navbar>
                <Row className={classes.root}>
                    <Col xs={12} md={8} className={classes.loginBanner}>
                    </Col>
                    <Col xs={12} md={4} className={classes.loginJumbo}>
                        <Jumbotron fluid className={classes.loginContainer}> 
                            <Typography variant="display1" gutterBottom> Sign in</Typography>
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
                                        <LoginForm {...this.props} />
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className={classes.tabContent}>
                                        <LoginForm {...this.props} />
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className={classes.tabContent}>
                                        <LoginForm {...this.props} />
                                    </div>
                                </TabPane>
                            </TabContent>
                        </Jumbotron> 
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
    onSubmit: (username, password) => {
        dispatch(login(username, password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));