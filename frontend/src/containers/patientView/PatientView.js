import React from 'react'
import { connect } from 'react-redux'
import {withStyles} from 'material-ui/styles'

// Actions and Reducers import 
import { addAppointment, handleMessageClose} from "../../actions/appointments"
import { snackbarOpen, snackbarMessage, getPatient } from "../../reducers"

// Components
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoctorTable from './DoctorTable'
import SearchDoctor from './SearchDoctor'
import BookDoctorDialog from '../../components/BookDoctorDialog'

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
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleBook = this.handleBook.bind(this)
        this.handleDateChange=this.handleDateChange.bind(this)
        this.handleChangeClinic=this.handleChangeClinic.bind(this)
        this.handleSnackClose=this.handleSnackClose.bind(this)
        this.state = {
            open: false,
            activeStep: 0,
            currentRow: null,
            selectedDate: new Date(),
            clinic: "",
            snackbarOpen: false,
            snackbarMessage: "",
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
        console.log("sda", this.state)
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

    handleSnackClose(){
        this.props.handleMessageClose()
    }

    render() {
        const {classes} = this.props
        return (
            <div>
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
                            className={classes.close}
                            onClick={this.handleSnackClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    snackbarOpen: snackbarOpen(state),
    snackbarMessage: snackbarMessage(state),
    patient: getPatient(state)
})

const mapDispatchToProps = (dispatch) => ({
    addAppointment: (data) => {
        dispatch(addAppointment(data))
    },
    handleMessageClose: () => {
        dispatch(handleMessageClose())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PatientView))