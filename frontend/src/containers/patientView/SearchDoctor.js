import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

// Actions and Reducers import 


// Components
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        fontSize: 40,
        textAlign: "center",
    },
})

class SearchDoctor extends React.Component {
   render() {
        const { classes } = this.props
        return (
            <Grid container spacing={24} >
                <Grid item xs={12}>
                    <TextField
                        id="full-width"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Search a Doctor"
                        helperText="search by name, specialization etc ..."
                        fullWidth
                        margin="normal"
                        inputProps={{className : classes.textField}}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: null
})

const mapDispatchToProps = (dispatch) => ({
    root: null
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SearchDoctor))