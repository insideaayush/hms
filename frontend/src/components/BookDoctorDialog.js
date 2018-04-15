import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import BookingSteps from './BookingSteps';
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles';
import DateTimePicker from './DateTimePicker'
import ClinicPicker from './ClinicPicker'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        // margin: theme.spacing.unit,
        minWidth: 120,
        width:"100%",
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

const PickDateTime = (props) => {
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                Pick your preferred Date and Time for appointment
                <DateTimePicker 
                    selectedDate={props.selectedDate}
                    handleDateChange={props.handleDateChange}
            />
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    )
}

class BookDoctorDialog extends React.Component {
    constructor(props){
        super(props)
        this.getSteps = this.getSteps.bind(this)
        this.getStepContent = this.getStepContent.bind(this)
    }
    


    getSteps() {
        return ['Select a Clinic', 'Select your preferred date and time'];
    }

    getStepContent(stepIndex, classes) {
        switch (stepIndex) {
            case 0:
                return (
                    <ClinicPicker 
                        clinic={this.props.clinic}
                        handleChangeClinic={this.props.handleChangeClinic}
                        all_clinics={this.props.currentRow.all_clinics}
                        classes={classes} 
                    />
                )
            case 1:
                return (
                    <PickDateTime 
                        selectedDate={this.props.selectedDate}
                        handleDateChange={this.props.handleDateChange}
                    />
                ) 
            default:
                return 'Uknown stepIndex';
        }
    }

    render() {
        const {classes, fullScreen} = this.props
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Dialog
                        fullScreen={fullScreen}
                        open={this.props.open}
                        onClose={this.props.handleClose}
                        aria-labelledby="form-dialog-title"
                        >
                        <DialogTitle id="form-dialog-title">Book an appointment</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You can book a doctor at his/her current available clinic or can select a different one from below.
                                Selecting the current(default) clinic may get you a closer appointment time
                            </DialogContentText>
                            <BookingSteps
                                currentRow={this.props.currentRow}
                                activeStep={this.props.activeStep}
                                handleNext={this.props.handleNext}
                                handleBack={this.props.handleBack}
                                handleReset={this.props.handleReset}
                                getSteps={() => this.getSteps()}
                                getStepContent={(idx) => this.getStepContent(idx, classes)}
                                clinic={this.props.clinic}
                                selectedDate={this.props.selectedDate}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button disabled={(this.props.activeStep > 1) ? false : true } onClick={this.props.handleBook} color="primary">
                                Book
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>
        );
    }
}
BookDoctorDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(BookDoctorDialog))