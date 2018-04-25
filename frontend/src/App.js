import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import { Route } from 'react-router'
import { withStyles } from 'material-ui/styles';

// actionCreaters and Reducers
import { getUserId, getUser, isAuthenticated, appLoader} from './reducers'
import {getLoggedInUser} from './actions/auth'

// Components
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import DrawerList from './components/DrawerList';
import Home from './containers/Home'
import { LinearProgress } from 'material-ui/Progress';
import AppointmentsTable from './containers/AppointmentsTable';
import { handleMessageClose, } from './actions/appointments'
import { snackbarMessage, snackbarOpen } from './reducers'
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '100%',
        marginTop: theme.spacing.unit * 0,
        zIndex: 1,
        overflow: 'hidden',
        flexGrow: 1,
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        overflowY: 'scroll',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
    },
    title: {
        flex: 1,
    },
    flex: {
        flex: 2,
    }
});

const routes = [
    {
        path: "/",
        exact: true,
        title: () => <span> Home</span>,
        main: () => <Home />,
    },
    {
        path: "/appointments/",
        exact: true,
        title: () => <span> Appointments</span>,
        main: () => <AppointmentsTable />,
    },
];

class App extends React.Component {
    constructor(props){
        super(props)
        this.handleSnackClose = this.handleSnackClose.bind(this)
        this.state = {
            mobileOpen: false,
        };
    }

    componentDidMount(){
        if(this.props.user_id){
            this.props.getLoggedInUser(this.props.user_id)
        }
    }
    
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    handleSnackClose() {
        this.props.handleMessageClose()
    }

    render() {
        const { classes, theme, loader } = this.props;
        const drawer = (
            <div>
                <div className={classes.drawerHeader}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            Eazecare
                        </Typography>
                    </Toolbar>
                </div>
                <Divider />
                <DrawerList 
                    handleLogout={this.props.handleLogout.bind(this)} 
                    is_patient={(this.props.user) ? this.props.user.is_patient : false}
                    is_doctor={(this.props.user) ? this.props.user.is_doctor : false}
                    is_clinic={(this.props.user) ? this.props.user.is_clinic : false}
                />             
            </div>
        );

        return (
            <div className={classes.root}>
                {(loader) ? <LinearProgress color="secondary" /> : null}
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerToggle}
                                className={classes.navIconHide}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.flex}>
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.title}
                                    />
                                ))}
                            </Typography>
                            <div>
                                <Typography variant="title" color="inherit">
                                    Hi, {
                                        (this.props.user) ?
                                        this.props.user.first_name : null
                                    }
                                </Typography>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        onClose={this.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <main className={classes.content}>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={this.props.snackbarOpen}
                            autoHideDuration={3000}
                            onClose={this.handleSnackClose}
                            SnackbarContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.props.snackbarMessage}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    // className={classes.close}
                                    onClick={this.handleSnackClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user_id: getUserId(state),
    user: getUser(state),
    isAuthenticated: isAuthenticated(state),
    loader: appLoader(state),
    snackbarOpen: snackbarOpen(state),
    snackbarMessage: snackbarMessage(state),
})

const mapDispatchToProps = (dispatch) => ({
    getLoggedInUser: (id) => {
        dispatch(getLoggedInUser(id))
    },
    handleLogout: () => {
        dispatch({
            type: '@@auth/HANDLE_LOGOUT'
        })
    },
    handleMessageClose: () => {
        dispatch(handleMessageClose())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(App));
