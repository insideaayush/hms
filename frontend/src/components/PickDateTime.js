import React from 'react'
import Grid from "material-ui/Grid";
import DateTimePicker from './DateTimePicker'

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

export default PickDateTime