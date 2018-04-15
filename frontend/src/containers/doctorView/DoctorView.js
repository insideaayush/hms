import React from 'react'
import { connect } from 'react-redux'
import { setDefaultClinic } from '../../actions/doctors'
import { getLoggedInDoctor, getUser} from '../../reducers'
import {withStyles} from 'material-ui/styles'
import Typography from 'material-ui/Typography';
import ClinicList from '../../components/ClinicList'
import Grid from 'material-ui/Grid';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import HealingIcon from '@material-ui/icons/Healing';
import {Jumbotron}from 'reactstrap'

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

class DoctorView extends React.Component {
    constructor(props){
        super(props)
        this.setDefaultClinic = this.setDefaultClinic.bind(this)
        this.state={
            selectedClinic: ""
        }
    }
    
    setDefaultClinic(id){
        this.props.setDefaultClinic(this.props.doctor.id, id)
    }

    render() {
        let welcomeMessage = ""
        if(this.props.user){
            welcomeMessage =  "Hello Dr, " + this.props.user.first_name + " " + this.props.user.last_name
        }
        else {
            welcomeMessage =  "Hello"
        }
        const {classes} = this.props
        
        return (
            <div>
                <Jumbotron className={classes.welcomeBanner}>
                    <Typography variant="title" gutterBottom>
                        {welcomeMessage}
                    </Typography>
                    <Typography variant="subheading">
                        You can set your current clinic here. To view <strong><em>pending appointments</em></strong> click on menu and go to appointments.
                    </Typography>
                </Jumbotron>
                
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="subheading">
                            Default Clinic:
                        </Typography>
                        <Chip
                            avatar={
                                <Avatar>
                                    <HealingIcon />
                                </Avatar>
                            }
                            label={((this.props.doctor) ? ((this.props.doctor.available_at) ? (this.props.doctor.available_at) : "Not Available") : "")}
                            className={classes.chip}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ClinicList
                            clinic={this.state.selectedClinic}
                            all_clinics={(this.props.doctor) ? this.props.doctor.all_clinics : []}
                            setDefaultClinic={this.setDefaultClinic}
                        />
                    </Grid>
                </Grid>
            </div>
        ) 
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    doctor: getLoggedInDoctor(state),
})

const mapDispatchToProps = (dispatch) => ({
    setDefaultClinic: (doctor_id, clinic_id) => {
        dispatch(setDefaultClinic(doctor_id, clinic_id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DoctorView))