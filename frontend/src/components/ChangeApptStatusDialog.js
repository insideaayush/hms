import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

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

class ChangeApptStatusDialog extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.props.open}
                    onClose={this.props.handleClose}
                >
                    <DialogTitle>Set the Status</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
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
                            </FormControl>
                        </form>
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

ChangeApptStatusDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeApptStatusDialog);
