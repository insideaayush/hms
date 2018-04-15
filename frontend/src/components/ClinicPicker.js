import React from 'react';
import Grid from 'material-ui/Grid'
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

const ClinicPicker = (props) => {
    const { classes } = props
    const items = (props.all_clinics) ? props.all_clinics.map((clinic) => {
        return (
            <MenuItem key={clinic} value={clinic}>{clinic}</MenuItem>
        )
    }) : null
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
                Pick a clinic
                <form className={classes.root} autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="clinic-simple">Clinic</InputLabel>
                        <Select
                            value={props.clinic}
                            onChange={props.handleChangeClinic}
                            inputProps={{
                                name: 'clinic',
                                id: 'clinic-simple',
                            }}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {items}
                        </Select>
                    </FormControl>
                </form>
            </Grid>
            <Grid item xs={12}>
            </Grid>
        </Grid>
    )
}

export default ClinicPicker