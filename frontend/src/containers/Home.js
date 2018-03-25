import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import List, { ListItem} from 'material-ui/List'
import Typography from 'material-ui/Typography';
import Card from '../components/Card'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
})

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <Grid className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems='flex-start'
                        direction='row'
                        justify='flex-start'
                    >
                        <Grid item xs={12} sm={2}>
                            <Typography>
                                Categories
                            </Typography>
                            <List component="nav">
                                <ListItem button>
                                    Obesity
                                </ListItem>
                                <ListItem button>
                                    Diabetes
                                </ListItem>
                                <ListItem button>
                                    Obesity
                                </ListItem>
                                <ListItem button>
                                    Joint Pain
                                </ListItem>
                                <ListItem button>
                                    Lupus   
                                </ListItem>
                                <ListItem button>
                                    Cancer
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Card/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = null

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme : true})(Home))