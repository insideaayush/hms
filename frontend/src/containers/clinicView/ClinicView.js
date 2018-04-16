import React from 'react'
import { connect } from 'react-redux'
import { setUnavailable } from '../../actions/doctors'
import { getClinic, getUser } from '../../reducers'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';
import { Jumbotron } from 'reactstrap'
import AvailableDoctorsList from '../../components/AvailableDoctorsList'
import Grid from 'material-ui/Grid';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
    welcomeBanner: {
        background: "linear-gradient(to left, #ffff1c, #00c3ff)",
    },
})

class ClinicView extends React.Component {
    render() {
        let welcomeMessage = ""
        if (this.props.clinic) {
            welcomeMessage = "Hello " + this.props.clinic.name
        }
        else {
            welcomeMessage = "Hello"
        }
        const { classes } = this.props
        return (
            <div>
                <Jumbotron className={classes.welcomeBanner}>
                    <Typography variant="title" gutterBottom>
                        {welcomeMessage}
                    </Typography>
                    <Typography variant="subheading">
                        You can view your available doctors here. To view <strong><em>pending appointments</em></strong> click on menu and go to appointments.
                    </Typography>
                </Jumbotron>
                <Typography variant="title" gutterBottom>
                    Available Doctors
                </Typography>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <AvailableDoctorsList setUnavailable={(id) => this.props.setUnavailable(id)} available_doctors={(this.props.clinic) ? this.props.clinic.available_doctors : []}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    clinic: getClinic(state),
})

const mapDispatchToProps = (dispatch) => ({
    setUnavailable: (doctor_id) => {
        dispatch(setUnavailable(doctor_id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClinicView))