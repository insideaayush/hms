import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'

const styles = theme => ({
    paper: null
})

const BookDoctor = (props) => {
    const {classes} = props
    return (
        <Grid container spacing={12}>
            <Grid item xs={6}>
                <Paper/>
            </Grid>
            <Grid item xs={6}>
                <Paper/>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    null: null,
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (username, password) => {
        dispatch(login(username, password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookDoctor));