import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open || false} 
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.authMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} variant="raised" color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;

