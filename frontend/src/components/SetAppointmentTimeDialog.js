import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import Select from 'material-ui/Select';
import PickDateTime from './PickDateTime';
import AddAlarmIcon from 'material-ui-icons/AddAlarm'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 256,
    },
});

class SetAppointmentTimeDialog extends React.Component {
    render() {

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <DialogTitle><AddAlarmIcon/> Set the Appointment Time and Status</DialogTitle>
                    <DialogContent>
                        <PickDateTime 
                            selectedDate={this.props.selectedDate}
                            handleDateChange={this.props.handleChange('appointmentTime')}
                        />
                        <Grid container spacing={24} >
                            <Grid item xs={12}>
                                <InputLabel htmlFor="age-simple">Appointment Status</InputLabel>
                                <Select
                                    value={this.props.status}
                                    onChange={this.props.handleChange('appointmentStatus')}
                                    input={<Input id="age-simple" />}
                                    fullWidth
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='C'>Confirmed</MenuItem>
                                    {(!this.props.clinic) ?
                                        <MenuItem value='S'>Completed</MenuItem> : null
                                    }
                                    <MenuItem value='F'>Failed</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        {/* <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                            </FormControl>
                        </form> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.props.handleOkPress} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

SetAppointmentTimeDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SetAppointmentTimeDialog);
