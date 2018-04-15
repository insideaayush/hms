import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class BookingSteps extends React.Component {
    render() {
        const { classes, activeStep } = this.props;
        const steps = this.props.getSteps();
        let clinicName = ""
        if(this.props.clinic !== "" && activeStep === steps.length){
            clinicName = this.props.currentRow.all_clinics.filter((clinic) => clinic === this.props.clinic)[0]
        }
        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                        return (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.props.activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&quot;re finished
                                You can press on Book to book your appointment
                            </Typography>
                            <strong> Clinic: </strong> {clinicName} <br />
                            <strong> Preferred Date and Time: </strong> {this.props.selectedDate.toString()} <br />
                            
                            <Button onClick={this.props.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                {this.props.getStepContent(activeStep)}
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.props.handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button variant="raised" color="primary" onClick={this.props.handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

BookingSteps.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(BookingSteps);

