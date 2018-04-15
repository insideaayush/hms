import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom'

// Icons
import HomeIcon from 'material-ui-icons/Home';
import LogoutIcon from 'material-ui-icons/ExitToApp';
import NoteAdd from 'material-ui-icons/NoteAdd';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    list :{
        textDecoration: "none"
    }
});

// TODO: ove this out of this component
const sidebarItems = {
    primary: [
        {
            text: 'Home',
            icon: <HomeIcon />,    
            url: '/',
        },
        {
            text: 'Appointments',
            icon: <NoteAdd />,    
            url: '/appointments/',
        },
    ],
    secondary: [
        {
            text: 'Logout',
            icon: <LogoutIcon />,
            url: null,
            action: (props) => {
                // props.handleLogout()
                props.handleLogout()
            }
        }
    ]

}

function DrawerList(props) {
    const { classes } = props;
    const primaryList  = sidebarItems.primary.map((item, index) => {
        return (
            <Link to={item.url} key={index}>
                <ListItem button>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            </Link>
        )
    })
    
    const secondaryList  = sidebarItems.secondary.map((item, index) => {
        if(item.url){
            return (
                <Link to={item.url} key={index} className={classes.list}>
                    <ListItem button>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                </Link>
            )
        }
        else if (item.action) {
            return (
                <ListItem button onClick={() => item.action(props)} key={index}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                </ListItem>
            )
        }
        else 
            return null
    })

    return (
        <div className={classes.root}>
            <List component="nav">
                {primaryList}
            </List>
            <Divider />
            <List component="nav">
                {secondaryList}
            </List>
        </div>
    );
}

DrawerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerList);
