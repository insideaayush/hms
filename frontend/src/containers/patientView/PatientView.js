import React from 'react'
import { connect } from 'react-redux'
import {withStyles} from 'material-ui/styles'

// Actions and Reducers import 


// Components
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import DoctorTable from './DoctorTable'
import SearchDoctor from './SearchDoctor'
import BookingContainer from './BookingContainer'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit
    },
    container: {
        position: "relative",
    }
})

class PatientView extends React.Component {
    constructor(props){
        super(props)
        this.addToBookCheckout = this.addToBookCheckout.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    addToBookCheckout(row){
        // console.log(row)
        this.handleClickOpen()
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <BookingContainer
                    open={this.state.open}
                    handleClickOpen={this.handleClickOpen}
                    handleClose={this.handleClose}
                />
                <Grid container spacing={24} className={classes.container}>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <SearchDoctor />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Paper className={classes.paper}>
                            <DoctorTable addToBookCheckout={this.addToBookCheckout}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: null
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientView))