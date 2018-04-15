import React from 'react'
import { connect } from 'react-redux'
import {withStyles} from 'material-ui/styles'

// Actions and Reducers import 
import { addAppointment} from "../../actions/appointments"
import { getPatient, getUser } from "../../reducers"

// Components
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import DoctorTable from './DoctorTable'
// import SearchDoctor from './SearchDoctor'
import BookDoctorDialog from '../../components/BookDoctorDialog'
import { Jumbotron } from 'reactstrap'
import Typography from 'material-ui/Typography';

const styles = theme => ({
    paper: {
        padding: theme.spacing.unit
    },
    container: {
        position: "relative",
    },
    welcomeBanner: {
        background: "linear-gradient(to left, #ffff1c, #00c3ff)",
    },
})

class PatientView extends React.Component {
    constructor(props){
        super(props)
        this.addToBookCheckout = this.addToBookCheckout.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleBook = this.handleBook.bind(this)
        this.handleDateChange=this.handleDateChange.bind(this)
        this.handleChangeClinic=this.handleChangeClinic.bind(this)
        this.state = {
            open: false,
            activeStep: 0,
            currentRow: null,
            selectedDate: new Date(),
            clinic: "",
        }
    }

    handleClickOpen = () => {
        this.setState({ 
            open: true,
        });
    }
    
    handleClickOpen = (row) => {
        this.setState({ 
            open: true, 
            currentRow: row,
            activeStep: 0,
            selectedDate: new Date(),
            clinic: "",
        });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    addToBookCheckout(row){
        this.handleClickOpen(row)
    }

    handleBook(){
        let data = {
            "book_by": this.props.patient.id,
            "doctor": this.state.currentRow.doctor_id,
            "location": this.state.clinic,
            "preferred_time": this.state.selectedDate,
        }

        this.props.addAppointment(data)
        this.setState({
            open: false,
        })
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    handleChangeClinic = (event) => {
        this.setState({ clinic: event.target.value });
    }

    render() {
        const {classes} = this.props
        let welcomeMessage = ""
        if (this.props.user) {
            welcomeMessage = "Hello " + this.props.user.first_name + " " + this.props.user.last_name
        }
        else {
            welcomeMessage = "Hello"
        }
        
        return (
            <div>
                <Jumbotron className={classes.welcomeBanner}>
                    <Typography variant="title" gutterBottom>
                        {welcomeMessage}
                    </Typography>
                    <Typography variant="subheading">
                        You can book a new appointment from here. To view <strong><em>pending appointments</em></strong> click on menu and go to appointments.
                    </Typography>
                </Jumbotron>
                <Grid container spacing={24} className={classes.container}>
                    <BookDoctorDialog
                        open={this.state.open}
                        currentRow={this.state.currentRow}
                        handleClickOpen={this.handleClickOpen}
                        handleClose={this.handleClose}
                        activeStep={this.state.activeStep}
                        handleNext={this.handleNext}
                        handleBack={this.handleBack}
                        handleReset={this.handleReset}
                        clinic={this.state.clinic}
                        handleChangeClinic={this.handleChangeClinic}
                        selectedDate={this.state.selectedDate}
                        handleDateChange={this.handleDateChange}
                        handleBook={this.handleBook}

                    />
                    {/* <Grid item xs={12} sm={2}>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <SearchDoctor />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                    </Grid> */}
                    <Grid item xs={12} sm={12}>
                        <Typography align="center" variant="display1">
                            Book an Appointment
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Paper className={classes.paper}>
                            <DoctorTable addToBookCheckout={this.addToBookCheckout}/>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    patient: getPatient(state)
})

const mapDispatchToProps = (dispatch) => ({
    addAppointment: (data) => {
        dispatch(addAppointment(data))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientView))