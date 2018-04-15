import React, { Fragment, PureComponent } from 'react';
import DTP from 'material-ui-pickers/DateTimePicker';

class DateTimePicker extends PureComponent {
    render(){
        return (
            <Fragment>
                <div className="picker">
                    <DTP
                        value={this.props.selectedDate}
                        disablePast
                        onChange={this.props.handleDateChange}
                        label="Select Appointment Time"
                        showTodayButton
                        fullWidth
                    />
                </div>
            </Fragment>
        )
    }
}

export default DateTimePicker