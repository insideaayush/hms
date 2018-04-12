import React, { Fragment, PureComponent } from 'react';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
// add this to html document   
// < link rel = "stylesheet" href = "https://fonts.googleapis.com/icon?family=Material+Icons" >

export default class DateTImePicker extends PureComponent {
    state = {
        selectedDate: new Date(),
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    }

    render() {
        const { selectedDate } = this.state;

        return (
            <Fragment>
                <div className="picker">
                    <DateTimePicker
                        value={selectedDate}
                        disablePast
                        onChange={this.handleDateChange}
                        label="Select Appointment Time"
                        showTodayButton
                        fullWidth
                    />
                </div>
            </Fragment>
        );
    }
}