import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import BookingSteps from './BookingSteps';
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import DateTImePicker from './DateTImePicker'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        width:"100%",
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class PickClinic extends React.Component {
    state = {
        clinic: '',
        name: 'hai',
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render(){
        const {classes} = this.props
        return (   
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    Pick a clinic
                    <form className={classes.root} autoComplete="off">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="clinic-simple">Clinic</InputLabel>
                            <Select
                                value={this.state.clinic}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'clinic',
                                    id: 'clinic-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        )
    }
}

class PickDateTime extends React.Component {
    state = {
        clinic: '',
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    Pick your preferred Date and Time for appointment
                    <DateTImePicker />
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        )
    }
}

function getSteps() {
    return ['Select a Clinic', 'Select your preferred date and time'];
}

function getStepContent(stepIndex, classes) {
    switch (stepIndex) {
        case 0:
            return <PickClinic classes={classes} />
        case 1:
            return <PickDateTime classes={classes}/>
        default:
            return 'Uknown stepIndex';
    }
}

class BookDoctorDialog extends React.Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <Dialog
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
                            activeStep={this.props.activeStep}
                            handleNext={this.props.handleNext}
                            handleBack={this.props.handleBack}
                            handleReset={this.props.handleReset}
                            getSteps={() => getSteps()}
                            getStepContent={(idx) => getStepContent(idx, classes)}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button disabled={(this.props.activeStep > 1) ? false : true } onClick={this.props.handleClose} color="primary">
                            Book
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(BookDoctorDialog)